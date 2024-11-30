import express from "express";
import { userRouter } from "./routes/user.router.js";
const app = express();
app.use(express.json());
app.use("/user", userRouter);
export { app };
