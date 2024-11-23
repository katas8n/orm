import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, nextF: NextFunction) => {
  console.error(err);

  return res.status(500).json({ message: "Something went wrong!" });
};
