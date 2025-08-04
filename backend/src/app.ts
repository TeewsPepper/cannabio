
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
// Importamos la configuración centralizada de Passport
import passport from "./auth/passport";

// Si no está definida, asignamos "development" por defecto
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Elegimos el archivo .env según el entorno
const envFile =
  process.env.NODE_ENV === "production" ? "../.env.production" : "../.env";

dotenv.config({ path: path.join(__dirname, envFile) });

const app = express();




// Configuración CORS mejorada
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    exposedHeaders: ["set-cookie"],
    maxAge: 86400,
  })
);

if (!process.env.SESSION_SECRET) {
  throw new Error("❌ ERROR: SESSION_SECRET no está definido en las variables de entorno");
}


// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true en producción, false en desarrollo
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // clave
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      /* domain: process.env.NODE_ENV === "production" ? ".onrender.com" : undefined, */ // solo en producción
    },
    name: "session.cookie",
  })
);

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());




// Rutas de autenticación
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
    res.redirect(`${frontendUrl}/transmision`);
  }
);

app.get("/auth/failure", (req: Request, res: Response) => {
  res.status(401).json({ error: "Error en autenticación con Google" });
});

// Ruta protegida
app.get("/transmision", ensureAuthenticated, (req: Request, res: Response) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

// Ruta para obtener estado de sesión
/* app.get("/api/session", (req: Request, res: Response) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    sessionId: req.sessionID,
  });
}); */
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
// Logout
app.post("/auth/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    req.session.destroy(() => {
      res.clearCookie("session.cookie");
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

