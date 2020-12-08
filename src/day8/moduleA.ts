import { parseInstruction, walkProgramCode } from "./helpers";

const moduleA = (list: string) => {
  const instructions = list
    .split("\n")
    .filter((line) => line.length > 0)
    .map(parseInstruction);
  return walkProgramCode(instructions).accumulator;
};

export default moduleA;
