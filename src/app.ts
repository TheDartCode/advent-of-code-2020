import fs from "fs";
import path from "path";

import day1 from "./day1";
import day2 from "./day2";
import day3 from "./day3";
import day4 from "./day4";
import { DayFunc, DayPart } from "./types";

type DaysDictionary = {
  [property: number]: DayFunc;
};

const days: DaysDictionary = {
  "1": day1,
  "2": day2,
  "3": day3,
  "4": day4,
};

const day = process.argv[2];
const part = process.argv[3] as DayPart;

console.log({ day, part });


const data = fs.readFileSync(path.join(__dirname, `../data/day${day}.txt`)).toString();

console.log(days[day](part, data));
