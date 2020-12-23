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
import day12 from "./day12";
import day13 from "./day13";
import day14 from "./day14";
import day15 from "./day15";
import day16 from "./day16";
import day17 from "./day17";
import day18 from "./day18";
import day19 from "./day19";
import day20 from "./day20";
import day21 from "./day21";
import day22 from "./day22";
import day23 from "./day23";
import { DayFunc, DayPart } from "./types";
import { PerformanceMonitor } from "./shared/helpers";

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
  "12": day12,
  "13": day13,
  "14": day14,
  "15": day15,
  "16": day16,
  "17": day17,
  "18": day18,
  "19": day19,
  "20": day20,
  "21": day21,
  "22": day22,
  "23": day23,
};

const day = process.argv[2];
const part = process.argv[3] as DayPart;

console.log({ day, part });

const solveDayPart = (day: string, part: DayPart) => {
  const data = fs
    .readFileSync(path.join(__dirname, `../data/day${day}.txt`))
    .toString();
  const pm = new PerformanceMonitor();
  const result = days[day](part, data);
  const time = pm.tick();
  console.log(`Day ${day} ${part}`, { result });
  console.log(`Done in ${time.toFixed(2)}ms`);
};

if (day && part) {
  solveDayPart(day, part);
} else {
  Object.keys(days).forEach((day) => {
    solveDayPart(day, DayPart.a);
    solveDayPart(day, DayPart.b);
  });
}
