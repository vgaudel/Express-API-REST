// Types liés à l'authentification. Fichier 100 % types : aucun code exécuté.

export type Role = "user" | "admin";

// Compte tel qu'il est STOCKÉ côté serveur.
// On ne stocke jamais le mot de passe en clair : uniquement son hash bcrypt.
export interface IUser {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
}

// Vue « publique » d'un compte : ce que l'on peut renvoyer au client (jamais le hash).
export type PublicUser = Omit<IUser, "passwordHash">;

// Contenu (payload) placé dans le token JWT.
// Il est signé mais PAS chiffré : le client peut le lire, pas le modifier.
// Ne jamais y mettre de secret (mot de passe, etc.).
export interface JwtPayload {
  sub: string; // « subject » : l'id de l'utilisateur (convention JWT)
  username: string;
  role: Role;
}
