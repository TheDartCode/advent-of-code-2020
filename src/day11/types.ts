export enum Space {
  EmptySeat = "L",
  OccupiedSeat = "#",
  Floor = ".",
}

export type Seat = {
  x: number;
  y: number;
};

export type SeatMap = Space[][];

export type Change = {
  content: Space;
} & Seat;
