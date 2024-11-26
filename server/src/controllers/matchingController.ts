import Driver from '../models/driver';
import Rider from '../models/rider';

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
