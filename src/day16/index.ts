import { DayFunc } from "../types";

import moduleA from "./moduleA";
import moduleB from "./moduleB";

const day16: DayFunc = (part, data, extraArgs: RegExp | string) => {
  switch (part) {
    case "a":
      return moduleA(data).toString();
    case "b":
      return moduleB(data, extraArgs).toString();
    default:
      throw new Error(`Wrong part given, \`${part}\``);
  }
};

export default day16;
