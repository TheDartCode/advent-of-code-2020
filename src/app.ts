import day1 from "./day1";
import { DayFunc, DayPart } from "./types";

type DaysDictionary = {
  [property: number]: DayFunc;
};

const days: DaysDictionary = {
  "1": day1,
};

const day = process.argv[2];
const part = process.argv[3] as DayPart;

console.log({day, part});

console.log(days[day](part));
