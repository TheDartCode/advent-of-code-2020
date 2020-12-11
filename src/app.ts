import fs from "fs";
import path from "path";

import day1 from "./day1";
import day2 from "./day2";
import day3 from "./day3";
import day4 from "./day4";
import day5 from "./day5";
import day6 from "./day6";
import day7 from "./day7";
import day8 from "./day8";
import day9 from "./day9";
import day10 from "./day10";
import day11 from "./day11";
import { DayFunc, DayPart } from "./types";

type DaysDictionary = {
  [property: string]: DayFunc;
};

const days: DaysDictionary = {
  "1": day1,
  "2": day2,
  "3": day3,
  "4": day4,
  "5": day5,
  "6": day6,
  "7": day7,
  "8": day8,
  "9": day9,
  "10": day10,
  "11": day11,
};

const day = process.argv[2];
const part = process.argv[3] as DayPart;

console.log({ day, part });

const data = fs
  .readFileSync(path.join(__dirname, `../data/day${day}.txt`))
  .toString();

console.log(days[day](part, data));
