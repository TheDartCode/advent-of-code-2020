import { parseLine } from "./helpers";
import { PasswordEntry } from "./types";

export const passwordEntryIsValid = (entry: PasswordEntry): boolean => {
  const {
    policy: { start, end, char },
    password,
  } = entry;
  return (
    (password.charAt(start - 1) === char) !==
    (password.charAt(end - 1) === char)
  );
};

const moduleB = (list: string): number => {
  const items = list.split("\n");
  return items.reduce((total, line) => {
    return total + (passwordEntryIsValid(parseLine(line)) ? 1 : 0);
  }, 0);
};

export default moduleB;
