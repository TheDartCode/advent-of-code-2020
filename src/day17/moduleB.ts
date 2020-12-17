import { ThreeDimGrid, CubeState, FourDimGrid } from "./types";
import {
  cloneGrid,
  cloneGridX4,
  expandGrid,
  expandGridX4,
  parseGridX4,
} from "./helpers";

const countActiveCubeNeighbors = (
  grid: FourDimGrid,
  x: number,
  y: number,
  z: number,
  w: number
) => {
  let neighborCount = 0;
  const NEIGHBOR_DIFFS = [-1, 0, 1];
  const result = NEIGHBOR_DIFFS.reduce((totalW, diffW) => {
    return (
      totalW +
      NEIGHBOR_DIFFS.reduce((totalZ, diffZ) => {
        return (
          totalZ +
          NEIGHBOR_DIFFS.reduce((totalY, diffY) => {
            return (
              totalY +
              NEIGHBOR_DIFFS.reduce((totalX, diffX) => {
                if (diffW === 0 && diffZ === 0 && diffY === 0 && diffX === 0) {
                  return totalX;
                }
                neighborCount++;
                const state =
                  grid?.[w + diffW]?.[z + diffZ]?.[y + diffY]?.[x + diffX]
                    ?.state;
                return totalX + (state === CubeState.Active ? 1 : 0);
              }, 0)
            );
          }, 0)
        );
      }, 0)
    );
  }, 0);

  return result;
};

export const round = (grid: FourDimGrid) => {
  expandGridX4(grid);
  const newGrid: FourDimGrid = cloneGridX4(grid);
  // need to extend grid
  for (let w in grid) {
    for (let z in grid[w]) {
      for (let y in grid[w][z]) {
        for (let x in grid[w][z][y]) {
          const activeNeighborCount = countActiveCubeNeighbors(
            grid,
            parseInt(x),
            parseInt(y),
            parseInt(z),
            parseInt(w)
          );
          if (
            grid[w][z][y][x].state === CubeState.Active &&
            !(activeNeighborCount === 2 || activeNeighborCount === 3)
          ) {
            newGrid[w][z][y][x].state = CubeState.Inactive;
          } else if (
            grid[w][z][y][x].state === CubeState.Inactive &&
            activeNeighborCount === 3
          ) {
            newGrid[w][z][y][x].state = CubeState.Active;
          }
        }
      }
    }
  }
  return newGrid;
};

const getSortedDimensions = (wrapper: Object) => {
  return Object.entries(wrapper).sort(
    ([key1], [key2]) => parseInt(key1) - parseInt(key2)
  );
};

export const visualizeGrid = (grid: ThreeDimGrid): string => {
  const dimensions = getSortedDimensions(grid)
    .map(([z, dimension]) => {
      return (
        `z=${z}` +
        "\n" +
        getSortedDimensions(dimension)
          .map(([_, row]) => {
            return getSortedDimensions(row)
              .map(([x, cube]) => cube.state)
              .join("");
          })
          .join("\n")
      );
    })
    .join("\n");
  return dimensions;
};

const moduleB = (list: string): number => {
  let grid = parseGridX4(list);

  for (let i = 0; i < 6; i++) {
    grid = round(grid);
  }

  return Object.values(grid).reduce((totalW, sliceW) => {
    return (
      totalW +
      Object.values(sliceW).reduce((totalZ, slice) => {
        return (
          totalZ +
          Object.values(slice).reduce((totalY, row) => {
            return (
              totalY +
              Object.values(row).reduce(
                (totalX, { state }) =>
                  totalX + (state === CubeState.Active ? 1 : 0),
                0
              )
            );
          }, 0)
        );
      }, 0)
    );
  }, 0);
};

export default moduleB;
