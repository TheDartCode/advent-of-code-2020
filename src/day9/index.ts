import { DayFunc } from "../types";

import moduleA from "./moduleA";
import moduleB from "./moduleB";

type Day9ExtraOptions = {
  preamble?: number;
  targetSum?: number;
};

const day9: DayFunc = (part, data, extraOptions: Day9ExtraOptions = {}) => {
  switch (part) {
    case "a":
      return moduleA(
        data,
        extraOptions.hasOwnProperty("preamble") && extraOptions
      ).toString();
    case "b":
      return moduleB(
        data,
        extraOptions.hasOwnProperty("targetSum") && extraOptions
      ).toString();
    default:
      throw new Error(`Wrong part given, \`${part}\``);
  }
};
export default day9;
