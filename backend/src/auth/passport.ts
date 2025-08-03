// src/auth/passport.ts
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

const authorizedUsers = new Set(process.env.AUTHORIZED_USERS?.split(",") || []);
console.log("Usuarios autorizados:", authorizedUsers);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        console.log("Email recibido desde Google:", email); // ✔️ Verifica que Google esté enviando el correo correcto
        if (!email) {
          return done(new Error("Email no disponible"));
        }

        if (!authorizedUsers.has(email)) {
          return done(new Error("Usuario no autorizado"));
        }

        const user = {
          id: profile.id,
          email,
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

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    done(null, { id } as Express.User);
  } catch (error) {
    done(error);
  }
});

export default passport;
