import { Space, SeatMap, Change } from "./types";
export const getMapChanges = (
  map: SeatMap,
  getNextContent: { (map: SeatMap, x: number, y: number): Space }
): Change[] => {
  const result = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const newContent = getNextContent(map, x, y);
      if (newContent !== map[y][x]) {
        result.push({
          content: newContent,
          x,
          y,
        });
      }
    }
  }
  return result;
};
export const countOccupiedSeats = (map: SeatMap): number => {
  return map.reduce(
    (total, row) =>
      total + row.filter((seat) => seat === Space.OccupiedSeat).length,
    0
  );
};

export const ADJACENT_SEATS = [
  { y: -1, x: -1 },
  { y: -1, x: 0 },
  { y: -1, x: 1 },
  { y: 0, x: -1 },
  { y: 0, x: 1 },
  { y: 1, x: -1 },
  { y: 1, x: 0 },
  { y: 1, x: 1 },
];
