import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

// Configuración mejorada de usuarios autorizados
const authorizedUsers = new Set(process.env.AUTHORIZED_USERS?.split(",") || []);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true // Añadido para acceso al request
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

        // Objeto usuario completo para la sesión
        const user = {
          id: profile.id,
          email: email,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value
        };

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

// Serialización mejorada
passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

// Deserialización con manejo de errores
passport.deserializeUser(async (id: string, done) => {
  try {
    // En una app real, aquí buscarías el usuario en tu DB
    // Por ahora devolvemos un objeto básico
    done(null, { id: id } as Express.User);
  } catch (error) {
    done(error);
  }
});