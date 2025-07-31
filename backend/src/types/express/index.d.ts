import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
      // como sólo usás id y email, no agregamos más
    }
  }
}

