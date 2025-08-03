import 'express';
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    cookie: session.Cookie;
    // Campos personalizados aquí (opcional):
    // returnTo?: string;
  }
}

declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
      name?: string;
      avatar?: string;
    }


   interface Request {
      user?: User;
      session: session.Session & Partial<session.SessionData>;
    }
  }
}

