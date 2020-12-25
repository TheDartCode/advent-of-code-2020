import { DayFunc } from "../types";

import moduleA from "./moduleA";

const day25: DayFunc = (part, data) => {
  switch (part) {
    case "a":
      return moduleA(data).toString();
    default:
      throw new Error(`Wrong part given, \`${part}\``);
  }
};

export default day25;
