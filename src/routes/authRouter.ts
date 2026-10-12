import express from "express";
import { authService } from "../services/authService";
import { authenticateJWT } from "../middleware/authenticateJWT";

export const authRouter = express.Router();

// POST /auth/register : inscription (publique)
authRouter.post("/register", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (typeof username !== "string" || username.trim().length < 3) {
    return res.status(400).json({ message: "username obligatoire (3 caractères minimum)" });
  }
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ message: "password obligatoire (8 caractères minimum)" });
  }

  const user = await authService.register(username.trim(), password);
  if (!user) {
    return res.status(409).json({ message: "Ce nom d'utilisateur est déjà utilisé" });
  }
  res.status(201).json(user);
});

// POST /auth/login : connexion, renvoie un token JWT (publique)
authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "username et password obligatoires" });
  }

  const result = await authService.login(username, password);
  if (!result) {
    // Message volontairement générique : on ne dit pas si c'est le login ou le mot de passe qui est faux.
    return res.status(401).json({ message: "Identifiants invalides" });
  }
  res.json(result); // { token, user }
});

// GET /auth/me : profil de l'utilisateur connecté (PROTÉGÉE)
authRouter.get("/me", authenticateJWT, (req, res) => {
  // req.user a été rempli par authenticateJWT.
  const user = authService.getUserById(req.user!.sub);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});
