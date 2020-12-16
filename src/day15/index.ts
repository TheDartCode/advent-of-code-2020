import { DayFunc } from "../types";

import moduleA from "./moduleA";
import moduleB from "./moduleB";

const day15: DayFunc = (part, data, rounds: number = 3e7) => {
  switch (part) {
    case "a":
      return moduleA(data).toString();
    case "b":
      return moduleB(data, rounds).toString();
    default:
      throw new Error(`Wrong part given, \`${part}\``);
  }
};

export default day15;
