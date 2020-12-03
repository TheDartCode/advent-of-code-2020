import fs from "fs";
import path from "path";

import { DayFunc } from "../types";

import moduleA from "./moduleA";
import moduleB from "./moduleB";

export const readInputA = () =>
  fs.readFileSync(path.join(__dirname, "inputA.txt")).toString();

const dayX: DayFunc = (part) => {
  switch (part) {
    case "a":
      return moduleA(readInputA()).toString();
    case "b":
      return moduleB(readInputA()).toString();
    default:
      throw new Error(`Wrong part given, \`${part}\``);
  }
};

export default dayX;
