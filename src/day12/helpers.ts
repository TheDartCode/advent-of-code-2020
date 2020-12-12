import { Action, Instruction } from "./types";

export const parseInstruction = (instruction: string): Instruction => {
  return {
    action: instruction.charAt(0) as Action,
    amount: parseInt(instruction.substr(1)),
  };
};
