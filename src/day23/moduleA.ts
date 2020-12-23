import { Cups } from "./types";
import { parseInput } from "./helpers";

const moduleA = (input: string): string => {
  const game = parseInput(input);

  game.simulate(100);

  return printCups(game.cups);
};

const printCups = (cups: Cups) => {
  let nextCup = cups.find((c) => c.label === 1).next;
  cups.find((c) => c.label === 1).next;
  const result = [];
  while (nextCup.label !== 1) {
    result.push(nextCup.label);
    nextCup = nextCup.next;
  }
  return result.join("");
};

export default moduleA;
