import { SeatFinder } from "./helpers";

const moduleB = (list): number => {
  const seatFinder = new SeatFinder();
  const IDs = list
    .split("\n")
    .filter(line => line.length > 0)
    .map(path => seatFinder.getSeatID(seatFinder.findSeat(path)));

  const MAX = Math.max(...IDs);
  const MIN = Math.min(...IDs);

  for (let i = MIN; i <= MAX; i++) {
    if (!IDs.includes(i)) {
      return i;
    }
  }
};

export default moduleB;
