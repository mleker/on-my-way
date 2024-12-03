import Ride, { RideStatus } from "../models/ride";
import { Request, Response } from "express";

export const getRides = async (req: Request, res: Response) => {
  try {
    const rides = await Ride.find({});
    if (rides.length < 1) {
      res.status(200).send({ message: "no rides available " });
    }
    res.status(200).send(rides);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const createRide = async (req: Request, res: Response) => {
  const { driverId, from, to, } = req.body;
  try {
    await Ride.create({
      driverId,
      status: RideStatus.PENDING,
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
    const req = await Ride.findOne({ driverId });
    if (!req) {
      res.status(404).send({ message: "Ride not found" });
      return;
    }
    await Ride.deleteOne({ driverId });
    res.status(200).send({ message: "Ride deleted" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const startRide = async (req: Request, res: Response) => {
  const { driverId } = req.body;
  try {
    const ride = await Ride.findOne({ driverId });
    if (!ride) {
      res.status(404).send({ message: "Ride not found" });
      return;
    }
    if (ride.status === RideStatus.IN_PROGRESS) {
      res.status(409).send({ message: "ride already in progress" });
    }
    await ride.updateOne({ status: RideStatus.IN_PROGRESS });
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
    await ride.updateOne({ status: RideStatus.FINISHED });
    res.status(200).send({ message: "ride completed" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};