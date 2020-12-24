import { initializeFloor, parseInput } from "./helpers";
import { TileFace } from "./types";

const moduleA = (input: string): number => {
  const paths = parseInput(input);

  const { tiles } = initializeFloor(paths);

  return Object.values(tiles).filter((tile) => tile.face === TileFace.Black)
    .length;
};

export default moduleA;
