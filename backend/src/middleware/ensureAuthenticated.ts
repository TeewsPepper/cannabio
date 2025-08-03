import { Request, Response, NextFunction } from "express";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  console.log("🛡️ Verificando autenticación...");
  console.log("👤 req.user:", req.user);
  console.log("💾 req.session:", req.session);

  if (req.isAuthenticated()) {
    const authorizedEmails = process.env.AUTHORIZED_USERS?.split(",") || [];
    const userEmail = (req.user as any)?.email; // Puedes ajustar el tipo si quieres

    console.log("📧 Correo del usuario:", userEmail);
    console.log("✅ Lista de autorizados:", authorizedEmails);

    if (userEmail && authorizedEmails.includes(userEmail)) {
      console.log("✅ Usuario autorizado");
      return next();
    }
    console.log("⛔ Usuario NO autorizado");
    return res.status(403).json({ message: "Acceso denegado: usuario no autorizado." });
  }
  console.log("⛔ Usuario NO autenticado");
  return res.status(401).json({ message: "No autenticado." });
}
