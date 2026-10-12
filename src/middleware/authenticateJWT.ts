import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../data/user";
import { authService } from "../services/authService";

// On ajoute une propriété `user` au type Request d'Express pour que les
// handlers placés APRÈS ce middleware puissent lire req.user avec le bon type.
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Middleware « gardien » : exécuté AVANT le handler de la route.
// Le client doit envoyer l'en-tête :  Authorization: Bearer <token>
// Le paramètre générique P laisse TypeScript déduire le type de req.params de chaque route
// (sans lui, req.params.id deviendrait « string | string[] »).
export function authenticateJWT<P>(req: Request<P>, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant (en-tête Authorization: Bearer <token>)" });
  }

  const token = authHeader.substring("Bearer ".length).trim();

  try {
    // Vérifie la signature et l'expiration ; lève une erreur sinon.
    req.user = authService.verifyToken(token);
    next(); // token valide : on passe au handler suivant
  } catch (error) {
    const message = error instanceof jwt.TokenExpiredError ? "Token expiré" : "Token invalide";
    res.status(401).json({ message });
  }
}
