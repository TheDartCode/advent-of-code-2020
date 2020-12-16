import { numbersGame } from "./helpers";

const moduleA = (list: string): number => {
  const startingNumbers = list.split(",").map((c) => parseInt(c));
  return numbersGame(startingNumbers, 2020);
};

export default moduleA;
