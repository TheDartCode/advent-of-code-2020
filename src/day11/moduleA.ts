import { Space, SeatMap, Change } from "./types";
import { getMapChanges, countOccupiedSeats, ADJACENT_SEATS } from "./helpers";

const getNextContent = (map: SeatMap, x: number, y: number): Space => {
  const seat = map[y][x];
  if (seat === Space.Floor) {
    return seat;
  }

  const occupiedAdjacentSeats = ADJACENT_SEATS.filter((s) => {
    if (!map[y + s.y] || !map[y + s.y][x + s.x]) {
      return false;
    }

    return map[y + s.y][x + s.x] === Space.OccupiedSeat;
  }).length;

  if (seat === Space.EmptySeat && occupiedAdjacentSeats === 0) {
    return Space.OccupiedSeat;
  }

  if (seat === Space.OccupiedSeat && occupiedAdjacentSeats >= 4) {
    return Space.EmptySeat;
  }

  return seat;
};

const moduleA = (list: string): number => {
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

export default moduleA;
