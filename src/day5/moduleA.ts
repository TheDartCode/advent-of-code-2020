import { SeatFinder } from "./helpers";

const moduleA = (list): number => {
  const seatFinder = new SeatFinder();
  const seatIDs = list
    .split("\n")
    .filter(line => line.length > 0)
    .map(seat => seatFinder.getSeatID(seatFinder.findSeat(seat)));
  return Math.max(...seatIDs);
};

export default moduleA;
