export interface IDriver {
  id: string;
  name: string;
  vehicle: string;
  license: string;
  time: number;
}

export const MockDrivers: IDriver[] = [
  {
    id: "1",
    name: "Ibrahim",
    vehicle: "Toyota Corolla",
    license: "AB62345",
    time: 5,
  },
  {
    id: "2",
    name: "Anastasia",
    vehicle: "BMW 3 Series",
    license: "CD67890",
    time: 6,
  },
]