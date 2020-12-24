import { Coords, COORD_DIFFS, Floor, Tile, TileEdge, TileFace } from "./types";

export const parseInput = (input: string): TileEdge[][] => {
  const lines = input.split("\n").filter((l) => l.length > 0);
  const data = lines.map((line) => {
    const regExp = new RegExp(/(e|se|sw|w|nw|ne)/g);
    let match: RegExpMatchArray;
    const result: TileEdge[] = [];
    while ((match = regExp.exec(line))) {
      result.push(TileEdge[match[0]]);
    }
    return result;
  });
  return data;
};

export const coordsToString = ({ x, y, z }: Coords) => `${x}_${y}_${z}`;

const REFERENCE_POINT = {
  x: 0,
  y: 0,
  z: 0,
};
export const mapPathToCoords = (path: TileEdge[]): Coords => {
  return path.reduce(
    (reduction, tileEdge) => {
      const diff = COORD_DIFFS[tileEdge];
      reduction.x += diff.x;
      reduction.y += diff.y;
      reduction.z += diff.z;
      return reduction;
    },
    { ...REFERENCE_POINT }
  );
};

export const expandFloor = ({ tiles, layers }: Floor, layer?: number): void => {
  const maxTileDepth = Math.max(...Object.keys(layers).map((l) => parseInt(l)));
  if (layer === undefined) {
    layer = maxTileDepth;
  }
  layers[layer + 1] = layers[layer + 1] || [];
  layers[layer].forEach((coordsString) => {
    const tile = tiles[coordsString];
    Object.entries(COORD_DIFFS).forEach(([, diff]) => {
      const newCoords: Coords = {
        x: tile.coords.x + diff.x,
        y: tile.coords.y + diff.y,
        z: tile.coords.z + diff.z,
      };
      const newCoordsString = coordsToString(newCoords);
      if (tiles[newCoordsString]) {
        return;
      }
      const newTile: Tile = {
        face: TileFace.White,
        coords: newCoords,
      };
      tiles[newCoordsString] = newTile;
      layers[layer + 1].push(newCoordsString);
    });
  });
};

export const initializeFloor = (paths: TileEdge[][]): Floor => {
  const referencePoint: Coords = Object.freeze({ x: 0, y: 0, z: 0 });

  let tiles: Record<string, Tile> = {
    [coordsToString(referencePoint)]: {
      coords: referencePoint,
      face: TileFace.White,
    },
  };
  const layers: Record<number, string[]> = {
    0: ["0_0_0"],
  };

  paths.forEach((path) => {
    const coords: Coords = mapPathToCoords(path);
    const coordsString = coordsToString(coords);
    let tile = tiles[coordsString];

    if (!tile) {
      tile = {
        coords,
        face: TileFace.White,
      };
      tiles[coordsString] = tile;
      const layer = Math.max(
        Math.abs(tile.coords.x),
        Math.abs(tile.coords.y),
        Math.abs(tile.coords.z)
      );
      if (!layers[layer]) {
        layers[layer] = [];
      }
      layers[layer].push(coordsString);
    }

    tile.face = tile.face === TileFace.White ? TileFace.Black : TileFace.White;
  });

  let maxTileDepth = Object.values(tiles)
    .map(({ coords }) => coords)
    .reduce(
      (max, { x, y, z }) =>
        Math.max(max, Math.abs(x), Math.abs(y), Math.abs(z)),
      0
    );

  for (let depth = 0; depth < maxTileDepth; depth++) {
    expandFloor({ tiles, layers }, depth);
  }

  return { tiles, layers };
};
