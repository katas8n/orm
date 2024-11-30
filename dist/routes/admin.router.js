import { Router } from "express";
export const adminRouter = Router();
adminRouter.post("/add-product");
adminRouter.post("/delete-product/:id");
