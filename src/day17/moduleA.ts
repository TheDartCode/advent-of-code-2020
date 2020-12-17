import { Grid, Cube, CubeState } from "./types";
import { cloneGrid, expandGrid, parseGrid } from "./helpers";

const countActiveCubeNeighbors = (
  grid: Grid,
  x: number,
  y: number,
  z: number
) => {
  let neighborCount = 0;
  const NEIGHBOR_DIFFS = [-1, 0, 1];
  const result = NEIGHBOR_DIFFS.reduce((totalZ, diffZ) => {
    return (
      totalZ +
      NEIGHBOR_DIFFS.reduce((totalY, diffY) => {
        return (
          totalY +
          NEIGHBOR_DIFFS.reduce((totalX, diffX) => {
            if (diffZ === 0 && diffY === 0 && diffX === 0) {
              return totalX;
            }
            neighborCount++;
            const state = grid?.[z + diffZ]?.[y + diffY]?.[x + diffX]?.state;
            return totalX + (state === CubeState.Active ? 1 : 0);
          }, 0)
        );
      }, 0)
    );
  }, 0);

  return result;
};

export const round = (grid: Grid) => {
  expandGrid(grid);
  const newGrid: Grid = cloneGrid(grid);
  // need to extend grid
  for (let z in grid) {
    for (let y in grid[z]) {
      for (let x in grid[z][y]) {
        const activeNeighborCount = countActiveCubeNeighbors(
          grid,
          parseInt(x),
          parseInt(y),
          parseInt(z)
        );
        if (
          grid[z][y][x].state === CubeState.Active &&
          !(activeNeighborCount === 2 || activeNeighborCount === 3)
        ) {
          newGrid[z][y][x].state = CubeState.Inactive;
        } else if (
          grid[z][y][x].state === CubeState.Inactive &&
          activeNeighborCount === 3
        ) {
          newGrid[z][y][x].state = CubeState.Active;
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

export const visualizeGrid = (grid: Grid): string => {
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

const moduleA = (list: string): number => {
  let grid = parseGrid(list);

  for (let i = 0; i < 6; i++) {
    grid = round(grid);
  }

  return Object.values(grid).reduce((totalZ, slice) => {
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
  }, 0);
};

export default moduleA;
