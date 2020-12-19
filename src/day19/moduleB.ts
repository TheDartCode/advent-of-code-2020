import { parseInput } from "./helpers";

const moduleB = (input: string): number => {
  input = input
    .replace("8: 42", "8: 42 | 42 8")
    .replace("11: 42 31", "11: 42 31 | 42 11 31");
  const { rules, messages } = parseInput(input);

  const masterRegExp = new RegExp(`^${rules[0].getRegexString()}$`);

  return messages.filter((message) => masterRegExp.test(message)).length;
};

export default moduleB;
