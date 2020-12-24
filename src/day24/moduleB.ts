import {
  coordsToString,
  expandFloor,
  initializeFloor,
  parseInput,
} from "./helpers";
import { Coords, COORD_DIFFS, Floor, Tile, TileEdge, TileFace } from "./types";

export const simulateDay = (floor: Floor): Floor => {
  const newTiles: typeof tiles = {};
  expandFloor(floor);
  const { tiles, layers } = floor;
  Object.entries(tiles).forEach(([key, tile]) => {
    let black = 0;
    Object.entries(COORD_DIFFS).forEach(([tileEdge, diff]) => {
      const targetCoords: Coords = {
        x: tile.coords.x + diff.x,
        y: tile.coords.y + diff.y,
        z: tile.coords.z + diff.z,
      };
      const coordsString = coordsToString(targetCoords);
      if (!tiles[coordsString]) {
        return;
      }
      const tileFace = tiles[coordsString].face;
      if (tileFace === TileFace.Black) {
        black++;
      }
    });
    if (tile.face === TileFace.Black && (black === 0 || black > 2)) {
      newTiles[key] = { ...tile, face: TileFace.White };
    } else if (tile.face === TileFace.White && black === 2) {
      newTiles[key] = { ...tile, face: TileFace.Black };
    } else {
      newTiles[key] = { ...tile };
    }
  });
  return { tiles: newTiles, layers };
};

const moduleB = (input: string): number => {
  const paths = parseInput(input);

  let floor = initializeFloor(paths);

  for (let i = 0; i < 100; i++) {
    floor = simulateDay(floor);
  }

  return Object.values(floor.tiles).filter(
    (tile) => tile.face === TileFace.Black
  ).length;
};

export default moduleB;
