import { numbersGame } from "./helpers";

const moduleB = (list: string, rounds: number): number => {
  const startingNumbers = list.split(",").map((c) => parseInt(c));
  return numbersGame(startingNumbers, rounds);
};

export default moduleB;
