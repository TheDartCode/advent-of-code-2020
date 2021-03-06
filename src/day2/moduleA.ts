import { parseLine } from "./helpers";
import { PasswordEntry } from "./types";

export const passwordEntryIsValid = (entry: PasswordEntry): boolean => {
  const {
    policy: { start, end, char },
    password,
  } = entry;
  const regexp = new RegExp(char, "g");
  const repetitions = password.match(regexp)?.length;
  return start <= repetitions && end >= repetitions;
};

const moduleA = (list: string): number => {
  const items = list.split("\n");
  return items.reduce((total, line) => {
    return total + (passwordEntryIsValid(parseLine(line)) ? 1 : 0);
  }, 0);
};

export default moduleA;
