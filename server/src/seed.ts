import { faker } from '@faker-js/faker';
import User from './models/user';
import Ride from './models/ride';
import Request from './models/request';

const clearDB = async () => {
  try {
    await User.deleteMany({});
    console.log('Database cleared');
  } catch (err) {
    console.error('Error clearing database:', err);
    process.exit(1);
  }
};

const seedDB = async () => {
  try {
    console.log('Seeding database...');
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        passwordHash: faker.internet.password(),
        phone: faker.phone.number(),
        vehicleType: faker.vehicle.type(),
        licenseNum: faker.vehicle.vrm(),
      });
    }
    const insertedUsers = await User.insertMany(users);

    const requests = [];
    for (let i = 0; i < 10; i++) {
      const randomUser = faker.helpers.arrayElement(insertedUsers);
      requests.push({
        riderId: randomUser._id,
        from: {
          name: faker.location.streetAddress(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        to: {
          name: faker.location.streetAddress(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        status: 'pending',
        createdAt: faker.date.recent(),
        estimatedFare: faker.number.int({ min: 5, max: 50 }),
      });
    }
    await Request.insertMany(requests);
    console.log('Requests created');

    const rides = [];
    for (let i = 0; i < 5; i++) {
      const randomDriver = faker.helpers.arrayElement(insertedUsers);
      rides.push({
        driverId: randomDriver._id,
        vehicle: randomDriver.vehicleType,
        from: {
          name: faker.location.streetAddress(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        to: {
          name: faker.location.streetAddress(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        status: faker.helpers.arrayElement(['pending', 'in_progress', 'finished']),
        createdAt: faker.date.recent(),
      });
    }
    await Ride.insertMany(rides);
    console.log('Rides created');

    console.log('Database seeded successfully');
    // process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

const runDBSeeder = async () => {
  await clearDB();
  await seedDB();
};

export default runDBSeeder;