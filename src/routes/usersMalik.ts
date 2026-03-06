import express from "express";
import { User } from "../data/user";
import { userListManagerMalik } from "../data/userList";

export const usersMalikRouter = express.Router();

usersMalikRouter.get("/", (req, res) => {
  res.json({ users: userListManagerMalik.getAllUsers() });
});

usersMalikRouter.get("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const user = userListManagerMalik.getUserByuserName(userName);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ user });
});

usersMalikRouter.get("/group/:group", (req, res) => {
  const group = req.params.group;
  res.json({ users: userListManagerMalik.getUsersByGroup(group) });
});

usersMalikRouter.get("/exists/:userName", (req, res) => {
  const userName = req.params.userName;
  res.json({ exists: userListManagerMalik.userExists(userName) });
});

usersMalikRouter.get("/count/total", (req, res) => {
  res.json({ totalUsers: userListManagerMalik.getTotalUsers() });
});

usersMalikRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = userListManagerMalik.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ user });
});

usersMalikRouter.post("/", (req, res) => {
  const user = new User(
    "",
    req.body.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.newPassword,
    req.body.mainGroup,
  );

  const created = userListManagerMalik.addUser(user);
  if (!created) {
    return res.status(400).json({ message: "Utilisateur avec ce userName existe déjà" });
  }
  res.json({ user });
});

usersMalikRouter.put("/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = new User(
    userId,
    req.body.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.newPassword,
    req.body.mainGroup,
  );

  const updated = userListManagerMalik.updateUser(userId, updatedUser);
  if (!updated) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ user: updatedUser });
});

usersMalikRouter.delete("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const deleted = userListManagerMalik.deleteUserByuserName(userName);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec userName ${userName} supprimé` });
});

usersMalikRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const deleted = userListManagerMalik.deleteUser(userId);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec id ${userId} supprimé` });
});