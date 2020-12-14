import { BitMask, Bits, Opcode, Operation } from "./types";

const parseLine = (line: string): Operation => {
  const parts = line.split(" = ");
  if (parts[0] === "mask") {
    return {
      opcode: Opcode.Mask,
      bitMask: parts[1].split("") as BitMask,
    };
  }

  return {
    opcode: Opcode.SetMem,
    address: parseInt(parts[0].replace("mem[", "").replace("]", "")),
    value: parseInt(parts[1]),
  };
};

export const parseInput = (input: string): Operation[] => {
  return input.split("\n").map((l: string) => parseLine(l));
};

export const numberToBits = (num: number): Bits => {
  return num.toString(2).padStart(36, "0").split("") as Bits;
};

export const bitsToNumber = (bits: Bits): number => {
  return parseInt(bits.join(""), 2);
};
