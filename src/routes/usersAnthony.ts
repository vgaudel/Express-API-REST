import express from "express";
import { User } from "../data/user";
import { userListManagerAnthony } from "../data/userList";

export const usersAnthonyRouter = express.Router();

usersAnthonyRouter.get("/", (req, res) => {
  res.json(userListManagerAnthony.getAllUsers());
});

usersAnthonyRouter.get("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const user = userListManagerAnthony.getUserByuserName(userName);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

usersAnthonyRouter.get("/group/:group", (req, res) => {
  const group = req.params.group;
  res.json(userListManagerAnthony.getUsersByGroup(group));
});

usersAnthonyRouter.get("/exists/:userName", (req, res) => {
  const userName = req.params.userName;
  res.json(userListManagerAnthony.userExists(userName));
});

usersAnthonyRouter.get("/count/total", (req, res) => {
  res.json(userListManagerAnthony.getTotalUsers());
});

usersAnthonyRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = userListManagerAnthony.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

usersAnthonyRouter.post("/", (req, res) => {
  const user = new User(
    "",
    req.body.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.newPassword,
    req.body.mainGroup,
  );

  const created = userListManagerAnthony.addUser(user);
  if (!created) {
    return res.status(400).json({ message: "Utilisateur avec ce userName existe déjà" });
  }
  res.json(user);
});

usersAnthonyRouter.put("/:id", (req, res) => {
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

  const updated = userListManagerAnthony.updateUser(userId, updatedUser);
  if (!updated) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(updatedUser);
});

usersAnthonyRouter.delete("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const deleted = userListManagerAnthony.deleteUserByuserName(userName);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec userName ${userName} supprimé` });
});

usersAnthonyRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const deleted = userListManagerAnthony.deleteUser(userId);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec id ${userId} supprimé` });
});