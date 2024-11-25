import Driver from '../models/Driver';
import Rider from '../models/Rider';

export const matchRiderToDriver = async (riderId: string) => {
  const rider = await Rider.findById(riderId);
  if (!rider) throw new Error('Rider not found');

  const drivers = await Driver.find({ isOnline: true });
  const matchedDriver = drivers.find((driver) =>
    driver.route.startPoint === rider.pickup &&
    driver.route.destination === rider.dropOff
  );

  return matchedDriver || null;
};
