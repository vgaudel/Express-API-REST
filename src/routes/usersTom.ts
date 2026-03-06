import express from "express";
import { User } from "../data/user";
import { userListManagerTom } from "../data/userList";

export const usersTomRouter = express.Router();

usersTomRouter.get("/", (req, res) => {
  res.json(userListManagerTom.getAllUsers());
});

usersTomRouter.get("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const user = userListManagerTom.getUserByuserName(userName);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

usersTomRouter.get("/group/:group", (req, res) => {
  const group = req.params.group;
  res.json(userListManagerTom.getUsersByGroup(group));
});

usersTomRouter.get("/exists/:userName", (req, res) => {
  const userName = req.params.userName;
  res.json(userListManagerTom.userExists(userName));
});

usersTomRouter.get("/count/total", (req, res) => {
  res.json(userListManagerTom.getTotalUsers());
});

usersTomRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = userListManagerTom.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(user);
});

usersTomRouter.post("/", (req, res) => {
  const user = new User(
    "",
    req.body.userName,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.newPassword,
    req.body.mainGroup,
  );

  const created = userListManagerTom.addUser(user);
  if (!created) {
    return res.status(400).json({ message: "Utilisateur avec ce userName existe déjà" });
  }
  res.json(user);
});

usersTomRouter.put("/:id", (req, res) => {
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

  const updated = userListManagerTom.updateUser(userId, updatedUser);
  if (!updated) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json(updatedUser);
});

usersTomRouter.delete("/username/:userName", (req, res) => {
  const userName = req.params.userName;
  const deleted = userListManagerTom.deleteUserByuserName(userName);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec userName ${userName} supprimé` });
});

usersTomRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const deleted = userListManagerTom.deleteUser(userId);
  if (!deleted) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }
  res.json({ message: `Utilisateur avec id ${userId} supprimé` });
});