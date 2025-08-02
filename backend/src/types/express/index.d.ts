import "express";
import "express-session"; // Añade esto para compatibilidad con session

declare global {
  namespace Express {
    // Extiende la interfaz User (igual que antes)
    interface User {
      id: string;
      email?: string;
      name?: string;     // Opcional si lo necesitas
      avatar?: string;   // Opcional si lo necesitas
    }

    // Extiende el objeto Request para mejor tipado
    interface Request {
      user?: User;       // Exactamente igual que antes
      session: Session & {
        cookie: session.Cookie;
        // Puedes añadir campos personalizados aquí si los usas:
        // returnTo?: string;
      };
    }
  }
}

