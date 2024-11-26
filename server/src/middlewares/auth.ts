import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    res.sendStatus(403).send({ message: "not authenticated" });
    return;
  }
  const token = authHeaders.split(" ")[1];
  try {
    const { id } = jwt.verify(token, SECRET_KEY as string) as { id: string };
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(401).send({ message: "no usir" });
      return;
    }
    req.body = user;
    next();
  } catch (error) {
    res.status(401).send({ message: "wronggg" });
  }
};
