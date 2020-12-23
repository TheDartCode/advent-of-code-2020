import { Game } from "./types";

export const parseInput = (input: string, extended: boolean = false): Game => {
  return new Game(
    input
      .split("\n")[0]
      .split("")
      .map((c) => parseInt(c)),
    extended
  );
};

export const clip = (cup: number, min: number, max: number) => {
  if (cup < min) {
    return max;
  }
  if (cup > max) {
    return min;
  }
  return cup;
};
