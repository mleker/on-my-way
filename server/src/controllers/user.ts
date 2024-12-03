import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

export const registerUser = async (req: Request, res: Response) => {
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
    const token = jwt.sign({ id: savedUser._id }, SECRET_KEY as string, {
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
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).send({ message: "Wrong password" });
      return;
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY as string, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { username, phoneNumber, vehicleType, licenseNum } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, phoneNumber, vehicleType, licenseNum },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.status(200).send({ message: "User updated", user });
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    res.status(200).send({ user, message: "here it is" });
  } catch (error) {
    res.status(404).send({ error, message: "Resource not found" });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Find user by email
    const user = await User.findOne({ email }); // Correctly query by email
    
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      res.status(400).json({ error: "Old password is incorrect" });
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.passwordHash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

