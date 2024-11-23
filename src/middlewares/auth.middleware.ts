import { NextFunction, Request, Response } from "express";

export const adminAuth = (req: Request, res: Response, nextF: NextFunction) => {
  const { password } = req.body;

  if (password !== "232323") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  nextF();
};
