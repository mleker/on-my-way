import express from 'express';
import Rider from '../models/rider';

const router = express.Router();

// Add a new rider
router.post('/', async (req, res) => {
  try {
    const rider = new Rider(req.body);
    await rider.save();
    res.status(201).json(rider);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rider', error });
  }
});

// Get all riders
router.get('/', async (req, res) => {
  try {
    const riders = await Rider.find();
    res.status(200).json(riders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching riders', error });
  }
});

export default router;
