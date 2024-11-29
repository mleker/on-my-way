export interface IRider {
  id: string;
  name: string;
  pickup: string;
  dropOff: string;
  time: number;
}

export const MockRiders: IRider[] = [
  {
    id: "1",
    name: "Pavlo",
    pickup: "Karl-Marx-Str. 1, 10178 Berlin",
    dropOff: "Warschauer Str. 1, 10245 Berlin",
    time: 5,
  },
  {
    id: "2",
    name: "Adil",
    pickup: "Karl-Marx-Str. 1, 10178 Berlin",
    dropOff: "Warschauer Str. 1, 10245 Berlin",
    time: 6,
  },
]