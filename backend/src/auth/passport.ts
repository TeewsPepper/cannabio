
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

// 1. Configuración directa de usuarios autorizados
const authorizedEmails = process.env.AUTHORIZED_USERS 
  ? process.env.AUTHORIZED_USERS.split(',').map(email => email.trim().toLowerCase())
  : [];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
      proxy: true 
    },
    (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        
        if (!email) {
          return done(null, false, { message: "No se encontró email en el perfil" });
        }

        // 2. Validación directa contra la lista
        if (!authorizedEmails.includes(email)) {
          console.log(`❌ Acceso denegado: ${email} no está autorizado`);
          return done(null, false, { message: "Usuario no autorizado" });
        }

        // 3. Creación simplificada del usuario
        const user = { 
          id: profile.id, 
          email 
        };

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

// 4. Serialización mínima (sin DB)
passport.serializeUser((user: any, done) => {
  done(null, user);
});

// 5. Deserialización básica
passport.deserializeUser((user: any, done) => {
  done(null, user); // lo recupera tal cual
});

export default passport;