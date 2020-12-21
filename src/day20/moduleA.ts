import { calculateTileConnections } from "./helpers";
import { Tile, TileID } from "./types";

const moduleA = (input: string): number => {
  const tiles = input.split("\n\n").map((tileString) => new Tile(tileString));

  const tileConnections = calculateTileConnections(tiles);
  const connectedTilesPerTile: Record<TileID, Set<TileID>> = Object.entries(
    tileConnections
  ).reduce((reduction, [tileID, versions]) => {
    reduction[tileID] = new Set();
    Object.values(versions).forEach((versionConnections) => {
      versionConnections.forEach((vc) => reduction[tileID].add(vc.otherTileID));
    });
    return reduction;
  }, {});

  const cornerTileIDs = Object.entries(connectedTilesPerTile)
    .filter(([, connections]) => connections.size === 2)
    .map((ct) => ct[0]);

  /*
   * we assume that there is only one solution to the problem
   */
  return cornerTileIDs.reduce(
    (product, tileID) => product * parseInt(tileID),
    1
  );
};

export default moduleA;
