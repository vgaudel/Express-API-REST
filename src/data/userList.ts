import { User } from './user';

export class UserList {
  private users: User[] = [
    new User('1', 'jdoe', 'John', 'Doe', 'john.doe@example.com', 'pass123', 'user'),
    new User('2', 'asmith', 'Alice', 'Smith', 'alice.smith@example.com', 'pass456', 'manager'),
    new User('3', 'bjones', 'Bob', 'Jones', 'bob.jones@example.com', 'pass789', 'user'),
    new User('4', 'cdavis', 'Carol', 'Davis', 'carol.davis@example.com', 'passABC', 'admin'),
    new User('5', 'ebrown', 'Eve', 'Brown', 'eve.brown@example.com', 'passDEF', 'user'),
  ];

  // READ : Récupérer tous les utilisateurs
  getAllUsers(): User[] {
    return [...this.users];
  }

  // READ : Récupérer un utilisateur par ID
  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // READ : Récupérer un utilisateur par userName
  getUserByuserName(userName: string): User | undefined {
    return this.users.find(user => user.userName === userName);
  }

  // CREATE : Ajouter un nouvel utilisateur
  addUser(user: User): boolean {
    if (this.getUserByuserName(user.userName)) {
      console.error('Utilisateur avec ce userName existe déjà');
      return false;
    }
    // Générer un nouvel ID
    const newId = new Date().getTime().toString();
    user.id = newId;
    this.users.push(user);
    return true;
  }

  // UPDATE : Modifier un utilisateur existant
  updateUser(id: string, updatedUser: User): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      console.error('Utilisateur non trouvé');
      return false;
    }
    updatedUser.id = id; // Conserver l'ID original
    this.users[index] = updatedUser;
    return true;
  }

  // DELETE : Supprimer un utilisateur par ID
  deleteUser(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      console.error('Utilisateur non trouvé');
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }

  // DELETE : Supprimer un utilisateur par userName
  deleteUserByuserName(userName: string): boolean {
    const index = this.users.findIndex(user => user.userName === userName);
    if (index === -1) {
      console.error('Utilisateur non trouvé');
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }

  // Récupérer le nombre total d'utilisateurs
  getTotalUsers(): number {
    return this.users.length;
  }

  // Vérifier si un utilisateur existe par userName
  userExists(userName: string): boolean {
    return this.users.some(user => user.userName === userName);
  }

  // Filtrer les utilisateurs par groupe
  getUsersByGroup(group: string): User[] {
    return this.users.filter(user => user.mainGroup === group);
  }


}

// Instance statique (singleton) pour utilisation globale
export const userListManagerAboubacar = new UserList();
export const userListManagerAnthony = new UserList();
export const userListManagerCedric = new UserList();
export const userListManagerMalik = new UserList();
export const userListManagerTimothe = new UserList();
export const userListManagerTom = new UserList();

