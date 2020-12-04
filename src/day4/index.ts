import { DayFunc } from "../types";

import moduleA from "./moduleA";
import moduleB from "./moduleB";

const day4: DayFunc = (part, data) => {
  switch (part) {
    case "a":
      return moduleA(data).toString();
    case "b":
      return moduleB(data).toString();
    default:
      throw new Error(`Wrong part given, \`${part}\``);
  }
};

export default day4;
