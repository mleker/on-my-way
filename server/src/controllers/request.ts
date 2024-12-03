import { Request, Response } from "express";
import request, { RequestStatus } from "../models/request";

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
  const { riderId, from, to } = req.body;
  try {
    await request.create({
      riderId,
      from,
      to,
      createdAt: Date.now(),
      status: RequestStatus.PENDING,
      estimatedFare: 0,
    });
    res.status(201).send({ message: "req created" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  const { riderId } = req.body;
  try {
    const req = await request.findOne({ riderId });
    if (!req) {
      res.status(404).send({ message: "Request not found" });
      return;
    }
    await request.deleteOne({ riderId });
    res.status(200).send({ message: "request deleted" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const matchRequest = async (req: Request, res: Response) => {
  const { riderId, driverId } = req.body;
  try {
    const req = await request.findOne({ riderId });
    if (!req) {
      res.status(404).send({ message: "Request not found" });
      return;
    }
    if (req.status === RequestStatus.MATCHED) {
      res.status(409).send({ message: "request already matched" });
      return;
    }
    await req.updateOne({ status: RequestStatus.MATCHED, driverId });
    res.status(200).send({ message: "request matched" });
  } catch (err) {
    res.status(500).send({ error: err, message: "somethings wrong" });
  }
};

export const cancelRequest = async (req: Request, res: Response) => {
  const { riderId } = req.body;
  try {
    const req = await request.findOne({ riderId });
    if (!req) {
      res.status(404).send({ message: "Request not found" });
      return;
    }
    if (req.status === RequestStatus.CANCELLED) {
      res.status(409).send({ message: "Request already cancelled" });
      return;
    }
    await req.updateOne({ status: RequestStatus.CANCELLED });
    res.status(200).send({ message: "Request cancelled" });
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};

export const getActiveRequests = async (req: Request, res: Response) => {
  try {
    const activeRequests = await request.find({ status: RequestStatus.PENDING });
    if (activeRequests.length < 1) {
      res.status(200).send({ message: "No active requests" });
      return;
    }
    res.status(200).send(activeRequests);
  } catch (err) {
    res.status(500).send({ error: err, message: "Something went wrong" });
  }
};