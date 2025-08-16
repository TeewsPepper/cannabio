import { Request, Response, NextFunction } from "express";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  

  if (req.isAuthenticated()) {
    const authorizedEmails = process.env.AUTHORIZED_USERS?.split(",") || [];
    const userEmail = (req.user as any)?.email; // Puedes ajustar el tipo si quieres

   

    if (userEmail && authorizedEmails.includes(userEmail)) {
      
      return next();
    }
    
    return res.status(403).json({ message: "Acceso denegado: usuario no autorizado." });
  }
  
  return res.status(401).json({ message: "No autenticado." });
}
