import day1 from "./day1";
import day2 from "./day2";
import { DayFunc, DayPart } from "./types";

type DaysDictionary = {
  [property: number]: DayFunc;
};

const days: DaysDictionary = {
  "1": day1,
  "2": day2,
};

const day = process.argv[2];
const part = process.argv[3] as DayPart;

console.log({ day, part });

console.log(days[day](part));
