export enum Opcodes {
  Acc = "acc",
  Jump = "jmp",
  Noop = "nop",
}

export interface Instruction {
  opcode: Opcodes;
  operand: number;
}

export const parseInstruction = (instruction: string): Instruction => {
  const [opcode, operand] = instruction.split(" ");
  return {
    opcode: opcode as Opcodes,
    operand: parseInt(operand),
  };
};
export const walkProgramCode = (
  instructions: Instruction[]
): { terminated: boolean; accumulator: number } => {
  let accumulator = 0;
  let eip = 0;
  let visitedIndices = [];
  let terminated;
  while (true) {
    const instruction = instructions[eip];
    visitedIndices.push(eip);
    switch (instruction.opcode) {
      case Opcodes.Acc:
        accumulator += instruction.operand;
        eip += 1;
        break;
      case Opcodes.Noop:
        eip += 1;
        break;
      case Opcodes.Jump:
        eip += instruction.operand;
        break;
    }
    if (visitedIndices.includes(eip)) {
      terminated = false;
      break;
    }
    if (eip === instructions.length) {
      terminated = true;
      break;
    }
  }
  return { accumulator, terminated };
};
