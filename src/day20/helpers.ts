import { EdgeDirection, Tile, TileConnection, TileConnections } from "./types";

/**
 * Rotates a 2-dimensional matrix 90 degrees clockwise
 *
 * @template T
 * @param {T[][]} matrix
 * @return {*}  {T[][]}
 */
export const rotateMatrix = function <T>(matrix: T[][]): T[][] {
  const size = matrix.length;
  const result = new Array<T>(size).fill(null).map(() => new Array<T>(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[j][size - 1 - i] = matrix[i][j];
    }
  }
  return result;
};

/**
 * Flips a 2-dimensional matrix horizontally (left-to-right)
 *
 * @template T
 * @param {T[][]} matrix
 * @return {*}  {T[][]}
 */
export const flipMatrixHr = function <T>(matrix: T[][]): T[][] {
  const size = matrix.length;
  const result = new Array<T>(size).fill(null).map(() => new Array<T>(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[i][size - 1 - j] = matrix[i][j];
    }
  }
  return result;
};

/**
 * Flips a 2-dimensional matrix vertically (top-to-bottom)
 *
 * @template T
 * @param {T[][]} matrix
 * @return {*}  {T[][]}
 */
export const flipMatrixVt = function <T>(matrix: T[][]): T[][] {
  const size = matrix.length;
  const result = new Array<T>(size).fill(null).map(() => new Array<T>(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[size - 1 - i][j] = matrix[i][j];
    }
  }
  return result;
};

/**
 * Flips a 2-dimensional matrix in both directions
 *
 * @template T
 * @param {T[][]} matrix
 * @return {*}  {T[][]}
 */
export const flipMatrix = function <T>(matrix: T[][]): T[][] {
  const size = matrix.length;
  const result = new Array<T>(size).fill(null).map(() => new Array<T>(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[size - 1 - i][size - 1 - j] = matrix[i][j];
    }
  }
  return result;
};

const EDGE_PAIRS = [
  [EdgeDirection.Up, EdgeDirection.Down],
  [EdgeDirection.Right, EdgeDirection.Left],
  [EdgeDirection.Down, EdgeDirection.Up],
  [EdgeDirection.Left, EdgeDirection.Right],
];

export const calculateTileConnections = (tiles: Tile[]): TileConnections => {
  const result: TileConnections = {};

  for (let tile of tiles) {
    if (!result[tile.ID]) {
      result[tile.ID] = {};
    }
    tile.versions.forEach((tileVersion, tileVersionIndex) => {
      for (let otherTile of tiles) {
        if (tile === otherTile) {
          continue;
        }
        otherTile.versions.forEach(
          (otherTileVersion, otherTileVersionIndex) => {
            EDGE_PAIRS.forEach(([edgeDirection, otherEdgeDirection]) => {
              if (
                tileVersion.edges[edgeDirection] ===
                otherTileVersion.edges[otherEdgeDirection]
              ) {
                const connection: TileConnection = {
                  tileID: tile.ID,
                  tileVersionIndex,
                  edgeDirection,
                  otherTileID: otherTile.ID,
                  otherTileVersionIndex,
                  otherEdgeDirection,
                };
                if (!result[tile.ID][tileVersionIndex]) {
                  result[tile.ID][tileVersionIndex] = [];
                }
                result[tile.ID][tileVersionIndex].push(connection);
              }
            });
          }
        );
      }
    });
  }
  return result;
};
