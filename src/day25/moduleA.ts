import { encrypt, findLoopSize, parseInput } from "./helpers";

const moduleA = (input: string): number => {
  const keys = parseInput(input);
  const loopSizes = keys.map(findLoopSize);
  return encrypt(keys[0], loopSizes[1]);
};

export default moduleA;
