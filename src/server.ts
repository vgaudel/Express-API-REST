import "source-map-support/register";
import express  from "express";
import cors from "cors";
import morgan from "morgan";
import { taskRouter } from "./routes/tasks";
import { usersAboubacarRouter } from "./routes/usersAboubacar";
import { usersAnthonyRouter } from "./routes/usersAnthony";
import { usersCedricRouter } from "./routes/usersCedric";
import { usersMalikRouter } from "./routes/usersMalik";
import { usersTimotheRouter } from "./routes/usersTimothe";
import { usersTomRouter } from "./routes/usersTom";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());

app.use("/tasks", taskRouter);
app.use("/users-aboubacar", usersAboubacarRouter);
app.use("/users-anthony", usersAnthonyRouter);
app.use("/users-cedric", usersCedricRouter);
app.use("/users-malik", usersMalikRouter);
app.use("/users-timothe", usersTimotheRouter);
app.use("/users-tom", usersTomRouter);

app.use(errorHandler);

export default app;

  