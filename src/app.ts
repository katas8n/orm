import express from "express";
import { userRouter } from "./routes/user.router";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

// app.use((err, req, res) => errorHandler(err, res, req));
export { app };
