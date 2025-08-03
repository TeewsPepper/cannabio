import express from "express";
import session from "express-session";
import { getRequiredEnv, getOptionalEnv } from "@utils/env";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

// Interface para el usuario
declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
      name?: string;
      avatar?: string;
    }
  }
}

const app = express();

// Configuración CORS mejorada
app.use(
  cors({
    origin: getOptionalEnv('FRONTEND_URL', 'http://localhost:5173'),
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    exposedHeaders: ["set-cookie"],
    maxAge: 86400,
  })
);

// Middleware para headers adicionales
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
    secret: getRequiredEnv("SESSION_SECRET"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true en Render
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    },
    name: "session.cookie"
  })
);

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuración de la estrategia Google
const authorizedUsers = new Set(process.env.AUTHORIZED_USERS?.split(",") || []);

passport.use(
  new GoogleStrategy(
    {
      clientID: getRequiredEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getRequiredEnv("GOOGLE_CLIENT_SECRET"),
      callbackURL: getRequiredEnv("GOOGLE_CALLBACK_URL"),
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Email no disponible"));
        }

        if (!authorizedUsers.has(email)) {
          return done(new Error("Usuario no autorizado"));
        }

        const user: Express.User = {
          id: profile.id,
          email: email,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value,
        };

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

// Serialización del usuario
passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

// Deserialización del usuario
passport.deserializeUser(async (id: string, done) => {
  try {
    // En una app real, aquí buscarías el usuario en tu DB
    done(null, { id } as Express.User);
  } catch (error) {
    done(error);
  }
});

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
    // Redirección directa sin abrir nueva ventana
    const frontendUrl = getOptionalEnv("FRONTEND_URL", "http://localhost:5173");
    res.redirect(`${frontendUrl}/transmision`);
  }
);

app.get("/auth/failure", (req, res) => {
  res.status(401).json({ error: "Error en autenticación con Google" });
});

// Middleware de autenticación
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

// Ruta protegida
app.get("/transmision", ensureAuthenticated, (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

// Ruta de sesión
app.get("/api/session", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    sessionId: req.sessionID,
  });
});

// Logout
app.post("/auth/logout", (req, res) => {
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
