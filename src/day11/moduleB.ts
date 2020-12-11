import { Space, SeatMap, Seat, Change } from "./types";
import { getMapChanges, countOccupiedSeats, ADJACENT_SEATS } from "./helpers";

const isDirectionOccupied = (
  map: SeatMap,
  baseSeat: Seat,
  directionX: number,
  directionY: number
): boolean => {
  {
    let multiplier = 1;
    while (true) {
      const currentY = directionY * multiplier + baseSeat.y;
      const currentX = directionX * multiplier + baseSeat.x;
      if (!map[currentY] || !map[currentY][currentX]) {
        return false;
      }

      const currentSeat = map[currentY][currentX];

      if (currentSeat === Space.EmptySeat) {
        return false;
      }

      if (currentSeat === Space.OccupiedSeat) {
        return true;
      }

      multiplier++;
    }
  }
};

const getNextContent = (map: SeatMap, x: number, y: number): Space => {
  const seat = map[y][x];
  if (seat === Space.Floor) {
    return seat;
  }

  const occupiedVisibleSeats = ADJACENT_SEATS.filter((s) =>
    isDirectionOccupied(map, { x, y }, s.x, s.y)
  ).length;

  if (seat === Space.EmptySeat && occupiedVisibleSeats === 0) {
    return Space.OccupiedSeat;
  }

  if (seat === Space.OccupiedSeat && occupiedVisibleSeats >= 5) {
    return Space.EmptySeat;
  }

  return seat;
};

const moduleB = (list: string): number => {
  const map = list.split("\n").map((l) => l.split("").map((c) => c as Space));
  let rounds = 0;
  while (true) {
    const changes = getMapChanges(map, getNextContent);
    rounds++;
    if (changes.length === 0) {
      break;
    }
    changes.forEach(({ content, x, y }) => {
      map[y][x] = content;
    });
  }

  return countOccupiedSeats(map);
};

export default moduleB;
