import { validateLocaleAndSetLanguage } from "typescript";

type PublicKey = number;

type PublicKeyPair = [PublicKey, PublicKey];

export const parseInput = (input: string): PublicKeyPair => {
  const [key1, key2] = input.split("\n");
  return [parseInt(key1), parseInt(key2)];
};

const PUBLIC_KEY_SUBJECT_NUMBER = 7;

export const findLoopSize = (publicKey: PublicKey): number => {
  let loopSize = 1;
  let value = 1;
  while (true) {
    value = encryptionStep(value, PUBLIC_KEY_SUBJECT_NUMBER);
    if (value === publicKey) {
      return loopSize;
    }
    loopSize++;
  }
};

export const encrypt = (input: number, loopSize: number): number => {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value = encryptionStep(value, input);
  }
  return value;
};

export const encryptionStep = (
  value: number,
  subjectNumber: number
): number => {
  value = value * subjectNumber;
  return value % 20201227;
};
