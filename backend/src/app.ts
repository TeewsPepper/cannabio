
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import passport from "./auth/passport";

// ---------------- NUEVAS DEPENDENCIAS PARA EL FORMULARIO ----------------
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
let envFile = "../.env";

if (process.env.NODE_ENV === "production") {
  envFile = "../.env.production";
} else if (process.env.NODE_ENV === "staging") {
  envFile = "../.env.staging";
}

dotenv.config({ path: path.join(__dirname, envFile) });

const app = express();

// ---------------- SEGURIDAD ----------------
app.use(helmet());

// ---------------- CORS ----------------

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://accounts.google.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    exposedHeaders: ["set-cookie"],
    maxAge: 86400,
  })
);

// ---------------- SESIONES ----------------
if (!process.env.SESSION_SECRET) {
  throw new Error(
    "❌ ERROR: SESSION_SECRET no está definido en las variables de entorno"
  );
}

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.set("trust proxy", 1);
}

app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure:
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging",
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging"
          ? "none"
          : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ---------------- PASSPORT ----------------
app.use(passport.initialize());
app.use(passport.session());

// ---------------- BODY PARSER ----------------
app.use(express.json());

// ---------------- RATE LIMIT PARA FORMULARIO ----------------
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 5, // 5 solicitudes por IP
  message: "Demasiadas solicitudes, inténtalo nuevamente más tarde",
});
app.use("/send-email", limiter);

// ---------------- CONFIGURACIÓN DE NODemailer ----------------
const DESTINATARIOS_PROD = [
  "dvidal@cannabiouy.com",
  "fsilveira@cannabiouy.com",
];

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASS,
  },
});

// ---------------- ENDPOINT FORMULARIO ----------------
app.post("/send-email", async (req: Request, res: Response) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // ---------------- VALIDACIÓN ----------------
    if (
      !nombre ||
      nombre.length < 2 ||
      nombre.length > 50 ||
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !mensaje ||
      mensaje.length < 10 ||
      mensaje.length > 1000
    ) {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    // ---------------- SANITIZACIÓN ----------------
    const sanitize = (str: string) =>
      str
        .trim()
        .replace(/<[^>]*>?/gm, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // ---------------- SELECCIÓN DE DESTINATARIOS SEGÚN ENTORNO ----------------
    const destinatarios =
      process.env.NODE_ENV === "production"
        ? DESTINATARIOS_PROD.join(",")
        : process.env.TEST_EMAILS; // correos de prueba en dev/staging

    const mailOptions = {
      from: `"${sanitize(nombre)}" <${process.env.ZOHO_EMAIL}>`,
       replyTo: email,
      to: destinatarios,
      subject: `Nuevo mensaje de: ${sanitize(nombre)}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #2c3e50;">Nuevo mensaje desde CannaBIO</h2>
          <p><strong>Nombre:</strong> ${sanitize(nombre)}</p>
          <p><strong>Email:</strong> ${sanitize(email)}</p>
          <p><strong>Mensaje:</strong><br/>${sanitize(mensaje).replace(
            /\n/g,
            "<br/>"
          )}</p>
          <hr/>
          <p style="font-size: 0.9em; color: #777;">Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado a:", destinatarios);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

// ---------------- RUTAS DE AUTENTICACIÓN ----------------
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    session: true,
  }),
  (req: Request, res: Response) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    console.log("✅ Autenticación exitosa, redirigiendo a frontend");

    res.redirect(`${frontendUrl}/transmision`);
  }
);

app.get("/auth/failure", (req: Request, res: Response) => {
  res.status(401).json({ error: "Error en autenticación con Google" });
});

app.get("/api/session", (req: Request, res: Response) => {
  console.log("📥 Llamada a /api/session");
  console.log("👤 Usuario:", req.user);
  console.log("💾 Sesión:", req.session);
  console.log("🔐 Autenticado:", req.isAuthenticated());

  if (req.isAuthenticated() && req.user) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false, user: null });
  }
});

// Ruta protegida
app.get("/transmision", ensureAuthenticated, (req: Request, res: Response) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

// Logout
app.post("/auth/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    req.session.destroy(() => {
      res.clearCookie("session");
      res.json({ success: true });
    });
  });
});

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor backend funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});

export default app;
