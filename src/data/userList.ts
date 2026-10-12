import { IUser, Role } from "./user";

// « Base de données » des comptes, EN MÉMOIRE (même principe que ProductList).
// Les comptes sont perdus à chaque redémarrage du serveur.
export class UserList {
  private users: IUser[] = [];
  private nextId = 1;

  findByUsername(username: string): IUser | undefined {
    return this.users.find((u) => u.username === username);
  }

  findById(id: string): IUser | undefined {
    return this.users.find((u) => u.id === id);
  }

  add(username: string, passwordHash: string, role: Role): IUser {
    const user: IUser = { id: String(this.nextId++), username, passwordHash, role };
    this.users.push(user);
    return user;
  }
}

export const userListManager = new UserList();
