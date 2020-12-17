import {
  Cube,
  CubeState,
  TwoDimGrid,
  OneDimGrid,
  ThreeDimGrid,
  FourDimGrid,
} from "./types";

const createEmptyFourDimensionalSlice = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number
): ThreeDimGrid => {
  const slice: ThreeDimGrid = {};
  for (let z = minZ; z <= maxZ; z++) {
    slice[z] = createEmptyThreeDimensionalSlice(minX, maxX, minY, maxY);
  }
  return slice;
};

const createEmptyThreeDimensionalSlice = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): TwoDimGrid => {
  const slice: TwoDimGrid = {};
  for (let y = minY; y <= maxY; y++) {
    slice[y] = createEmptyTwoDimensionalSlice(minX, maxX);
  }
  return slice;
};

const createEmptyTwoDimensionalSlice = (
  minX: number,
  maxX: number
): OneDimGrid => {
  const slice: OneDimGrid = {};
  for (let x = minX; x <= maxX; x++) {
    slice[x] = createEmptyOneDimensionalSlice();
  }
  return slice;
};

const createEmptyOneDimensionalSlice = (): Cube => {
  return { state: CubeState.Inactive };
};

export const cloneGrid = (grid: ThreeDimGrid): ThreeDimGrid =>
  JSON.parse(JSON.stringify(grid)) as ThreeDimGrid;
export const cloneGridX4 = (grid: FourDimGrid): FourDimGrid =>
  JSON.parse(JSON.stringify(grid)) as FourDimGrid;

export const expandGrid = (grid: ThreeDimGrid) => {
  const zValues = Object.keys(grid).map((val) => parseInt(val));
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);
  const yValues = Object.keys(grid["0"]).map((val) => parseInt(val));
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const xValues = Object.keys(grid["0"]["0"]).map((val) => parseInt(val));
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);

  for (let z = minZ; z <= maxZ; z++) {
    for (let y = minY; y <= maxY; y++) {
      grid[z][y][minX - 1] = createEmptyOneDimensionalSlice();
      grid[z][y][maxX + 1] = createEmptyOneDimensionalSlice();
    }
  }

  for (let z = minZ; z <= maxZ; z++) {
    grid[z][minY - 1] = createEmptyTwoDimensionalSlice(minX - 1, maxX + 1);
    grid[z][maxY + 1] = createEmptyTwoDimensionalSlice(minX - 1, maxX + 1);
  }

  grid[minZ - 1] = createEmptyThreeDimensionalSlice(
    minX - 1,
    maxX + 1,
    minY - 1,
    maxY + 1
  );
  grid[maxZ + 1] = createEmptyThreeDimensionalSlice(
    minX - 1,
    maxX + 1,
    minY - 1,
    maxY + 1
  );
};

export const expandGridX4 = (grid: FourDimGrid) => {
  const wValues = Object.keys(grid).map((val) => parseInt(val));
  const minW = Math.min(...wValues);
  const maxW = Math.max(...wValues);
  const zValues = Object.keys(grid[0]).map((val) => parseInt(val));
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);
  const yValues = Object.keys(grid[0][0]).map((val) => parseInt(val));
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const xValues = Object.keys(grid[0][0][0]).map((val) => parseInt(val));
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);

  for (let w = minW; w <= maxW; w++) {
    for (let z = minZ; z <= maxZ; z++) {
      for (let y = minY; y <= maxY; y++) {
        grid[w][z][y][minX - 1] = createEmptyOneDimensionalSlice();
        grid[w][z][y][maxX + 1] = createEmptyOneDimensionalSlice();
      }
    }
  }

  for (let w = minW; w <= maxW; w++) {
    for (let z = minZ; z <= maxZ; z++) {
      grid[w][z][minY - 1] = createEmptyTwoDimensionalSlice(minX - 1, maxX + 1);
      grid[w][z][maxY + 1] = createEmptyTwoDimensionalSlice(minX - 1, maxX + 1);
    }
  }

  for (let w = minW; w <= maxW; w++) {
    grid[w][minZ - 1] = createEmptyThreeDimensionalSlice(
      minX - 1,
      maxX + 1,
      minY - 1,
      maxY + 1
    );
    grid[w][maxZ + 1] = createEmptyThreeDimensionalSlice(
      minX - 1,
      maxX + 1,
      minY - 1,
      maxY + 1
    );
  }

  grid[minW - 1] = createEmptyFourDimensionalSlice(
    minX - 1,
    maxX + 1,
    minY - 1,
    maxY + 1,
    minZ - 1,
    maxZ + 1
  );

  grid[maxW + 1] = createEmptyFourDimensionalSlice(
    minX - 1,
    maxX + 1,
    minY - 1,
    maxY + 1,
    minZ - 1,
    maxZ + 1
  );
};

export const parseGrid = (input: string): ThreeDimGrid => {
  const twoDimArray: Cube[][] = input
    .split("\n")
    .map((l) => l.split("").map((state) => ({ state: state as CubeState })));

  return {
    "0": twoDimArray.reduce((yReduction, row, yIndex) => {
      yReduction[yIndex] = row.reduce((xReduction, cube, xIndex) => {
        xReduction[xIndex] = cube;
        return xReduction;
      }, {});
      return yReduction;
    }, {}),
  };
};

export const parseGridX4 = (input: string): FourDimGrid => {
  const twoDimArray: Cube[][] = input
    .split("\n")
    .map((l) => l.split("").map((state) => ({ state: state as CubeState })));

  return {
    "0": {
      "0": twoDimArray.reduce((yReduction, row, yIndex) => {
        yReduction[yIndex] = row.reduce((xReduction, cube, xIndex) => {
          xReduction[xIndex] = cube;
          return xReduction;
        }, {});
        return yReduction;
      }, {}),
    },
  };
};
