import { Passport } from "./types";

const moduleB = (str: string) => {
  const passportStrings = str.split("\n\n");
  return passportStrings
    .map((ps) => new Passport(ps).isValid({strict: true}))
    .reduce((total, validity) => total + (validity ? 1 : 0), 0);
};

export default moduleB;
