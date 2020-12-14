import { BitMask, Bit, Bits, Opcode, Operation } from "./types";
import { bitsToNumber, numberToBits, parseInput } from "./helpers";

const enforceBitMask = (address: Bits, bitMask: BitMask): Bits[] => {
  const newAddress = address.map((bit, index) => {
    const mask = bitMask[index];
    if (mask === "0") {
      return bit;
    }
    return mask;
  });

  const Xs = newAddress.filter((bit) => bit === "X").length;
  const totalPermutations = Math.pow(2, Xs);

  const permutations = new Array(totalPermutations)
    .fill(null)
    .map((_, index) => index.toString(2).padStart(Xs, "0").split(""));

  return permutations.map((permutation, index) => {
    let xIndex: number = permutation.length - 1;
    const result: Bits = new Array(newAddress.length);
    for (let i = newAddress.length - 1; i >= 0; i--) {
      let newBit: string = newAddress[i];
      if (newBit === "X") {
        newBit = permutation[xIndex];
        xIndex--;
      }
      result[i] = newBit as Bit;
    }
    return result;
  });
};

const moduleB = (list: string): number => {
  const data = parseInput(list);
  let memory: { [key: number]: number } = {};
  let currentBitMask: BitMask;
  data.forEach((operation) => {
    if (operation.opcode === Opcode.Mask) {
      currentBitMask = operation.bitMask;
      return;
    }
    const addresses = enforceBitMask(
      numberToBits(operation.address),
      currentBitMask
    );
    addresses.forEach((address) => {
      memory[bitsToNumber(address)] = operation.value;
    });
  });

  return Object.values(memory)
    .filter((num) => num !== 0)
    .reduce((total, num) => total + num, 0);
};

export default moduleB;
