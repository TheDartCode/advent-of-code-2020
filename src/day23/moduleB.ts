import { parseInput } from "./helpers";

const TOTAL_ROUNDS = 10e6;

const moduleB = (input: string): number => {
  const game = parseInput(input, true);

  game.simulate(TOTAL_ROUNDS);

  const cupOne = game.cups.find((c) => c.label === 1);
  return cupOne.next.label * cupOne.next.next.label;
};

export default moduleB;
