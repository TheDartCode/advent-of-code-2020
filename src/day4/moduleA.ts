import { Passport } from "./types";

const moduleA = (str: string) => {
  const passportStrings = str.split("\n\n");
  return passportStrings
    .map((ps) => new Passport(ps).isValid())
    .reduce((total, validity) => total + (validity ? 1 : 0), 0);
};

export default moduleA;
