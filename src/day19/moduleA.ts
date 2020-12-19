import { parseInput } from "./helpers";

const moduleA = (list: string): number => {
  const { rules, messages } = parseInput(list);

  const masterRegExp = new RegExp(`^${rules[0].getRegexString()}$`);

  return messages.filter((message) => masterRegExp.test(message)).length;
};

export default moduleA;
