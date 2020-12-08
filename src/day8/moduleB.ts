import {
  Instruction,
  Opcodes,
  parseInstruction,
  walkProgramCode,
} from "./helpers";

const generatePermutations = (instructions: Instruction[]): Instruction[][] => {
  const result: Instruction[][] = [];
  instructions.forEach((instruction, index) => {
    if (instruction.opcode === Opcodes.Acc) {
      return;
    }
    result.push([
      ...instructions.slice(0, index),
      {
        ...instruction,
        opcode:
          instruction.opcode === Opcodes.Jump ? Opcodes.Noop : Opcodes.Jump,
      },
      ...instructions.slice(index + 1),
    ]);
  });
  return result;
};

const moduleB = (list: string) => {
  const instructions = list
    .split("\n")
    .filter((line) => line.length > 0)
    .map(parseInstruction);

  const permutations = generatePermutations(instructions);

  for (let permutation of permutations) {
    const { terminated, accumulator } = walkProgramCode(permutation);
    if (terminated) {
      return accumulator;
    }
  }

  throw new Error("No valid permutation found");
};

export default moduleB;
