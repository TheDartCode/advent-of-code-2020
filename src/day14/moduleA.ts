import { BitMask, Bit, Bits, Opcode, Operation } from "./types";
import { bitsToNumber, numberToBits, parseInput } from "./helpers";

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
