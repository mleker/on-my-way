import Driver from "../models/driver";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const getDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await Driver.find({});
    res.send(drivers).status(200);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const createDriver = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const driver = await Driver.findOne({ email: email });
  if (driver) {
    res.send({ error: 409, message: "driver already exists" }).status(409);
    return;
  }
  if (password.length < 8) {
    res.status(409).send({
      error: 409,
      message: "password should be 8 at least chars long",
    });
    return;
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    await Driver.create({ ...req.body, password: hashed });
    res.status(201).send({ message: "driver created" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  const { email } = req.body;
  const driver = await Driver.findOne({ email: email });
  if (!driver) {
    res.send({error: 404, message: "driver with this email doesnt exist" });
    return;
  }
  try {
    await Driver.deleteOne({ email: email });
    res.send({ message: "driver deleted" }).status(200);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};
