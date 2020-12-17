export enum CubeState {
  Active = "#",
  Inactive = ".",
}

export type Cube = {
  state: CubeState;
};

export type OneDimGrid = {
  [pos: string]: Cube;
};

export type TwoDimGrid = {
  [pos: string]: OneDimGrid;
};

export type Grid = {
  [z: string]: TwoDimGrid;
};
