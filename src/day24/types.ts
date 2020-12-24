export enum TileEdge {
  e,
  se,
  sw,
  w,
  nw,
  ne,
}

export enum TileFace {
  White,
  Black,
}

export type Coords = {
  x: number;
  y: number;
  z: number;
};

export const COORD_DIFFS: Record<TileEdge, Coords> = {
  [TileEdge.e]: {
    x: 1,
    y: -1,
    z: 0,
  },
  [TileEdge.se]: {
    x: 0,
    y: -1,
    z: 1,
  },
  [TileEdge.sw]: {
    x: -1,
    y: 0,
    z: 1,
  },
  [TileEdge.w]: {
    x: -1,
    y: 1,
    z: 0,
  },
  [TileEdge.nw]: {
    x: 0,
    y: 1,
    z: -1,
  },
  [TileEdge.ne]: {
    x: 1,
    y: 0,
    z: -1,
  },
};

export type Tile = {
  coords: Coords;
  face: TileFace;
};

export type Floor = {
  tiles: Record<string, Tile>;
  layers: Record<number, string[]>;
};
