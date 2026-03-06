import express from "express";
import { User } from "../data/user";
import { userListManagerAboubacar } from "../data/userList";

export const usersAboubacarRouter = express.Router();

usersAboubacarRouter.get("/", (req, res) => {
  res.json({ users: userListManagerAboubacar.getAllUsers() });
});

usersAboubacarRouter.get("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const user = userListManagerAboubacar.getUserByuserName(userName);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ user });
});

usersAboubacarRouter.get("/group/:group", (req, res) => {
  const group = req.params.group;
  res.json({ users: userListManagerAboubacar.getUsersByGroup(group) });
});

usersAboubacarRouter.get("/exists/:userName", (req, res) => {
  const userName = req.params.userName;
  res.json({ exists: userListManagerAboubacar.userExists(userName) });
});

usersAboubacarRouter.get("/count/total", (req, res) => {
  res.json({ totalUsers: userListManagerAboubacar.getTotalUsers() });
});

usersAboubacarRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = userListManagerAboubacar.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ user });
});

usersAboubacarRouter.post("/", (req, res) => {
  const user = new User(
    "",
    req.body.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.newPassword,
    req.body.mainGroup,
  );

  const created = userListManagerAboubacar.addUser(user);
  if (!created) {
    return res.status(400).json({ message: "Utilisateur avec ce userName existe déjà" });
  }
  res.json({ user });
});

usersAboubacarRouter.put("/:id", (req, res) => {
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

  const updated = userListManagerAboubacar.updateUser(userId, updatedUser);
  if (!updated) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ user: updatedUser });
});

usersAboubacarRouter.delete("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const deleted = userListManagerAboubacar.deleteUserByuserName(userName);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec userName ${userName} supprimé` });
});

usersAboubacarRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const deleted = userListManagerAboubacar.deleteUser(userId);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec id ${userId} supprimé` });
});