import Ride from "../models/ride";
import { Request, Response } from "express";

export const getRides = async (req: Request, res: Response) => {
  try {
    const rides = await Ride.find({});
    if (rides.length < 1) {
      res.status(200).send({ message: "no rides available " });
    }
    res.status(200).send(rides);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wronggg" });
  }
};

export const createRide = async (req: Request, res: Response) => {
  const { driverId, from, to, } = req.body;
  try {
    await Ride.create({
      driverId,
      status: "availible",
      from,
      to,
      createdAt: Date.now(),
    });
    res.status(201).send({ message: "Ride created" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const deleteRide = async (req: Request, res: Response) => {
  const { driverId } = req.body;
  try {
    const rq = await Ride.findOne({ driverId });
    if (!rq) {
      res.status(404).send({ message: "Ride not found" });
      return;
    }
    await Ride.deleteOne({ driverId });
    res.status(200).send({ message: "Ride deleted" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const acceptRide = async (req: Request, res: Response) => {
  const { driverId } = req.body;
  try {
    const ride = await Ride.findOne({ driverId });
    if (!ride) {
      res.status(404).send({ message: "Ride not found" });
      return;
    }
    if (ride.status === "in progress") {
      res.status(409).send({ message: "ride already in progress" });
    }
    await ride.updateOne({ status: "in progress" });
    res.status(200).send({ message: "ride in progress" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const completeRide = async (req: Request, res: Response) => {
  const { driverId } = req.body;
  try {
    const ride = await Ride.findOne({ driverId });
    if (!ride) {
      res.status(404).send({ message: "Ride not found" });
      return;
    }
    await ride.updateOne({ status: "completed" });
    res.status(200).send({ message: "ride completed" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};