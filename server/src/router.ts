import express from "express";
import { Request, Response } from "express";
import { getDrivers, createDriver, deleteDriver } from "./controllers/driver";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcomeeererere");
});

router.get("/drivers", getDrivers);
router.post("/regdriver", createDriver);
router.delete("/deldriver", deleteDriver);

export default router;
