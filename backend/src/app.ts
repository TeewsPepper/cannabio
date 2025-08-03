// src/app.ts
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

// Importamos la configuración centralizada de Passport
import passport from "./auth/passport";

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

// Middleware para headers adicionales (opcional, por las dudas)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cache-Control"
  );
  next();
});

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true en Render
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    },
    name: "session.cookie",
  })
);

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para verificar autenticación
function ensureAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "No autenticado" });
}

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
  (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/transmision`);
  }
);

app.get("/auth/failure", (req, res) => {
  res.status(401).json({ error: "Error en autenticación con Google" });
});

// Ruta protegida
app.get("/transmision", ensureAuthenticated, (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

// Ruta para obtener estado de sesión
app.get("/api/session", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    sessionId: req.sessionID,
  });
});

// Logout
app.post("/auth/logout", (req, res, next) => {
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
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});

export default app;
