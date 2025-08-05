import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

// 1. Configuración directa de usuarios autorizados
const authorizedEmails = process.env.AUTHORIZED_USERS
  ? process.env.AUTHORIZED_USERS.split(",").map((email) =>
      email.trim().toLowerCase()
    )
  : [];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
      scope: ["profile", "email"],
      proxy: true,
    },
    (req, accessToken, refreshToken, profile: Profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          console.log("❌ Email no encontrado en perfil de Google");
          return done(null, false, { message: "Email no disponible" });
        }

        if (!authorizedEmails.includes(email)) {
          console.log(`⛔ Intento de acceso no autorizado: ${email}`);
          return done(null, false, { message: "Usuario no autorizado" });
        }

        // 3. Creación simplificada del usuario
        const user: Express.User = {
          id: profile.id,
          email: email,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value,
        };
        console.log("✅ Usuario autorizado:", user.email);
        return done(null, user);
      } catch (error) {
        console.error("🔥 Error en estrategia Google:", error);
        return done(error as Error);
      }
    }
  )
);

// Serialización (guarda solo el ID en la sesión)
passport.serializeUser((user: Express.User, done) => {
  console.log("📦 Serializando usuario completo:", user);
  done(null, user); // <<== Guarda todo el objeto
});

// Deserialización (recupera el usuario básico)
passport.deserializeUser((user: Express.User, done) => {
  console.log("📦 Deserializando usuario:", user);
  done(null, user); // <<== Ya es todo el usuario, no hay que reconstruir
});

export default passport;
