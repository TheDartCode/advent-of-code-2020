import { PuzzleData } from "./types";

export const parseInput = (input: string): PuzzleData => {
  const [journeyStart, busIDs] = input.split("\n");
  const buses = busIDs
    .split(",")
    .filter((bus) => bus !== "x")
    .map((bus) => parseInt(bus));

  return {
    start: parseInt(journeyStart),
    buses,
  };
};

const moduleA = (list: string): number => {
  const { start, buses } = parseInput(list);

  const closestApproach = buses
    .map((bus) => ({ busID: bus, time: Math.ceil(start / bus) * bus }))
    .sort((b1, b2) => b1.time - b2.time)[0];

  return closestApproach.busID * (closestApproach.time - start);
};

export default moduleA;
