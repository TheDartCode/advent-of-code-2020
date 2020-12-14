import { BitMask, Bit, Bits, Opcode, Operation } from "./types";

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

const parseInput = (input: string): Operation[] => {
  return input.split("\n").map((l: string) => parseLine(l));
};

const numberToBits = (num: number): Bits => {
  return num.toString(2).padStart(36, "0").split("") as Bits;
};

const bitsToNumber = (bits: Bits): number => {
  return parseInt(bits.join(""), 2);
};

const enforceBitMask = (bits: Bits, bitMask: BitMask): Bits => {
  return bits.map((bit, index) => {
    const mask = bitMask[index];
    return mask === "X" ? bit : mask;
  });
};

const moduleA = (list: string): number => {
  const data = parseInput(list);
  let memory: { [key: number]: number } = {};
  let currentBitMask: BitMask;
  data.forEach((operation) => {
    if (operation.opcode === Opcode.Mask) {
      currentBitMask = operation.bitMask;
      return;
    }
    memory[operation.address] = bitsToNumber(
      enforceBitMask(numberToBits(operation.value), currentBitMask)
    );
  });

  return Object.values(memory)
    .filter((num) => num !== 0)
    .reduce((total, num) => total + num, 0);
};

export default moduleA;
