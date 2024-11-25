import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "testin";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users).status(200);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "User already exists" });
      return;
    }

    if (password.length < 8) {
      res
        .status(400)
        .send({ message: "Password should be at least 8 characters long" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).send({ message: "User created", token });
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ message: "Wrong password" });
      return;
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.send({ error: 404, message: "user with this email doesnt exist" });
    return;
  }
  try {
    await User.deleteOne({ email: email });
    res.send({ message: "user deleted" }).status(200);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};
