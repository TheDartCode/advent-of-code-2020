export enum Action {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
  Left = "L",
  Right = "R",
  Forward = "F",
}

export type Instruction = {
  action: Action;
  amount: number;
};

export type Position = {
  x: number;
  y: number;
};

export type ShipInfo = {
  bearingIndex: number;
} & Position;

export const BEARINGS = [Action.North, Action.East, Action.South, Action.West];
