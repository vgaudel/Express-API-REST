import express from "express";
import { User } from "../data/user";
import { userListManagerTimothe } from "../data/userList";

export const usersTimotheRouter = express.Router();

usersTimotheRouter.get("/", (req, res) => {
  res.json(userListManagerTimothe.getAllUsers());
});

usersTimotheRouter.get("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const user = userListManagerTimothe.getUserByuserName(userName);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

usersTimotheRouter.get("/group/:group", (req, res) => {
  const group = req.params.group;
  res.json(userListManagerTimothe.getUsersByGroup(group));
});

usersTimotheRouter.get("/exists/:userName", (req, res) => {
  const userName = req.params.userName;
  res.json(userListManagerTimothe.userExists(userName));
});

usersTimotheRouter.get("/count/total", (req, res) => {
  res.json(userListManagerTimothe.getTotalUsers());
});

usersTimotheRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = userListManagerTimothe.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

usersTimotheRouter.post("/", (req, res) => {
  const user = new User(
    "",
    req.body.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.newPassword,
    req.body.mainGroup,
  );

  const created = userListManagerTimothe.addUser(user);
  if (!created) {
    return res.status(400).json({ message: "Utilisateur avec ce userName existe déjà" });
  }
  res.json(user);
});

usersTimotheRouter.put("/:id", (req, res) => {
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

  const updated = userListManagerTimothe.updateUser(userId, updatedUser);
  if (!updated) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(updatedUser);
});

usersTimotheRouter.delete("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const deleted = userListManagerTimothe.deleteUserByuserName(userName);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec userName ${userName} supprimé` });
});

usersTimotheRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const deleted = userListManagerTimothe.deleteUser(userId);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec id ${userId} supprimé` });
});