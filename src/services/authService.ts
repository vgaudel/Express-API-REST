import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUser, JwtPayload, PublicUser } from "../data/user";
import { userListManager } from "../data/userList";

// La clé secrète signe les tokens : qui la connaît peut fabriquer de faux tokens.
// On refuse donc de démarrer sans elle (elle vient du fichier .env).
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET manquant : copiez .env.example vers .env et renseignez-le.");
}
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"];

// Nombre de « tours » de hachage bcrypt : plus c'est haut, plus c'est sûr mais lent.
const SALT_ROUNDS = 10;

function toPublicUser(user: IUser): PublicUser {
  return { id: user.id, username: user.username, role: user.role };
}

export const authService = {
  // Création d'un compte : le mot de passe est haché, jamais stocké en clair.
  // Renvoie null si le nom d'utilisateur est déjà pris.
  async register(username: string, password: string): Promise<PublicUser | null> {
    if (userListManager.findByUsername(username)) {
      return null;
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    // Le rôle est toujours "user" : il ne doit jamais venir du client.
    return toPublicUser(userListManager.add(username, passwordHash, "user"));
  },

  // Vérifie les identifiants. Renvoie un token JWT + l'utilisateur, ou null si invalides.
  async login(username: string, password: string): Promise<{ token: string; user: PublicUser } | null> {
    const user = userListManager.findByUsername(username);
    // bcrypt.compare re-hache le mot de passe fourni et compare : on ne « déchiffre » jamais un hash.
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return null;
    }

    const payload: JwtPayload = { sub: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { token, user: toPublicUser(user) };
  },

  // Vérifie la signature ET l'expiration. Lève une erreur si le token est invalide.
  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as unknown as JwtPayload;
  },

  getUserById(id: string): PublicUser | null {
    const user = userListManager.findById(id);
    return user ? toPublicUser(user) : null;
  },
};

// Compte de démonstration pour tester sans passer par /auth/register.
userListManager.add("admin", bcrypt.hashSync("admin123", SALT_ROUNDS), "admin");
