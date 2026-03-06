import express from "express";
import { User } from "../data/user";
import { userListManagerCedric } from "../data/userList";

export const usersCedricRouter = express.Router();

usersCedricRouter.get("/", (req, res) => {
  res.json(userListManagerCedric.getAllUsers());
});

usersCedricRouter.get("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const user = userListManagerCedric.getUserByuserName(userName);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user );
});

usersCedricRouter.get("/group/:group", (req, res) => {
  const group = req.params.group;
  res.json(userListManagerCedric.getUsersByGroup(group));
});

usersCedricRouter.get("/exists/:userName", (req, res) => {
  const userName = req.params.userName;
  res.json(userListManagerCedric.userExists(userName));
});

usersCedricRouter.get("/count/total", (req, res) => {
  res.json(userListManagerCedric.getTotalUsers());
});

usersCedricRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = userListManagerCedric.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

usersCedricRouter.post("/", (req, res) => {
  const user = new User(
    "",
    req.body.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.newPassword,
    req.body.mainGroup,
  );

  const created = userListManagerCedric.addUser(user);
  if (!created) {
    return res.status(400).json({ message: "Utilisateur avec ce userName existe déjà" });
  }
  res.json(user );
});

usersCedricRouter.put("/:id", (req, res) => {
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

  const updated = userListManagerCedric.updateUser(userId, updatedUser);
  if (!updated) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(updatedUser);
});

usersCedricRouter.delete("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const deleted = userListManagerCedric.deleteUserByuserName(userName);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec userName ${userName} supprimé` });
});

usersCedricRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const deleted = userListManagerCedric.deleteUser(userId);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec id ${userId} supprimé` });
});