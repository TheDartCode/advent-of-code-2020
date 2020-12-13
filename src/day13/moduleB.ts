import { performance } from "perf_hooks";

type Bus = {
  busID: number;
  index: number;
};

export const parseInput = (input: string): Bus[] => {
  const [, busIDs] = input.split("\n");
  const buses = busIDs
    .split(",")
    .map((bus, index) => ({ busID: bus === "x" ? -1 : parseInt(bus), index }))
    .filter((bus) => bus.busID !== -1);

  return buses;
};

const solveForBuses = (
  buses: Bus[],
  { base, minAddition }: { base: number; minAddition: number }
): number => {
  let start = performance.now();
  let i = 0;
  while (true) {
    const potentialSolution = base + i * minAddition;
    let found = true;
    for (let bus of buses) {
      if ((potentialSolution + bus.index) % bus.busID !== 0) {
        found = false;
        break;
      }
    }
    if (found) {
      return potentialSolution;
    }
    if (i % 1e8 === 0) {
      const time = performance.now() - start;
      start = performance.now();
    }
    i++;
  }
};

const moduleB = (list: string): number => {
  const buses = parseInput(list);

  const ranges = new Array(buses.length)
    .fill(0)
    .map((_, index) => index + 1)
    .slice(1);

  let base = buses[0].busID;
  ranges.forEach((busCount) => {
    const busSubset = buses.slice(0, busCount);
    const minAddition = buses
      .slice(0, busCount - 1)
      .reduce((total, { busID }) => total * busID, 1);
    base = solveForBuses(busSubset, { base, minAddition });
  });
  return base;
};

export default moduleB;
