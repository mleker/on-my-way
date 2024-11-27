import { Request, Response } from "express";
import request from "../models/request";

export const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await request.find({});
    if (requests.length < 1) {
      res.status(200).send({ message: "no requests available " });
    }
    res.status(200).send(requests);
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const createRequest = async (req: Request, res: Response) => {
  const { riderId, location, destination } = req.body;
  try {
    await request.create({
      riderId,
      status: "pending",
      location,
      destination,
      createdAt: Date.now(),
    });
    res.status(201).send({ message: "req created" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  const { riderId } = req.body;
  try {
    const rq = await request.findOne({ riderId });
    if (!rq) {
      res.status(404).send({ message: "Request not found" });
      return;
    }
    await request.deleteOne({ riderId });
    res.status(200).send({ message: "request deleted" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const acceptRequest = async (req: Request, res: Response) => {
  const { riderId } = req.body;
  try {
    const rq = await request.findOne({ riderId });
    if (!rq) {
      res.status(404).send({ message: "Request not found" });
      return;
    }
    if (rq.status === "accepted") {
      res.status(409).send({ message: "request already accepted" });
    }
    await rq.updateOne({ status: "accepted" });
    res.status(200).send({ message: "request accepted" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};
