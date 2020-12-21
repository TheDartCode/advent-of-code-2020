import {
  calculateTileConnections,
  flipMatrixHr,
  flipMatrixVt,
  rotateMatrix,
} from "./helpers";
import {
  EdgeDirection,
  ImageConfiguration,
  Pixel,
  Tile,
  TileConnection,
  TileConnections,
  TileContents,
} from "./types";

export const findBestImageFit = (
  tiles: Tile[],
  graph: TileConnections,
  startingTiles: TileConnection[]
): ImageConfiguration => {
  const size = Math.sqrt(tiles.length);
  const invalidTileVersions: { [tileID: string]: number[] } = {};

  const addInvalidTileVersion = (
    tileID: string,
    x: number,
    y: number,
    otherTileID: string,
    version: number
  ) => {
    const key = getInvalidTileHashKey(tileID, x, y, otherTileID);
    if (!invalidTileVersions[key]) {
      invalidTileVersions[key] = [];
    }
    invalidTileVersions[key].push(version);
  };

  const getInvalidTileHashKey = (
    tileID: string,
    x: number,
    y: number,
    otherTileID: string
  ) => `${tileID},${x},${y},${otherTileID}`;

  const image: TileConnection[][] = new Array(size);

  for (let y = 0; y < size; y++) {
    image[y] = new Array(size);
    for (let x = 0; x < size; x++) {
      if (x == 0 && y == 0) {
        image[y][x] = startingTiles.find(
          (st) =>
            !invalidTileVersions[
              getInvalidTileHashKey(st.tileID, x, y, null)
            ]?.includes(st.tileVersionIndex)
        );
        if (!image[y][x]) {
          throw new Error();
        }
        continue;
      }

      let leftTile = x > 0 ? image[y][x - 1] : null;
      let upperTile = y > 0 ? image[y - 1][x] : null;
      let nextTile: TileConnection;
      if (leftTile) {
        if (x === 1 && y === 0) {
          nextTile = graph[leftTile.otherTileID][
            leftTile.otherTileVersionIndex
          ].find(
            (st) =>
              st.edgeDirection === EdgeDirection.Left &&
              st.otherTileID === leftTile.tileID &&
              !invalidTileVersions[
                getInvalidTileHashKey(st.tileID, x, y, leftTile.tileID)
              ]?.includes(st.tileVersionIndex)
          );
        } else {
          leftTile = graph[leftTile.tileID][leftTile.tileVersionIndex].find(
            (st) =>
              st.edgeDirection === EdgeDirection.Right &&
              !invalidTileVersions[
                getInvalidTileHashKey(st.tileID, x, y, leftTile.tileID)
              ]?.includes(st.tileVersionIndex)
          );

          nextTile = graph[leftTile.otherTileID][
            leftTile.otherTileVersionIndex
          ].find(
            (st) =>
              st.edgeDirection === EdgeDirection.Left &&
              st.otherTileID === leftTile.tileID &&
              !invalidTileVersions[
                getInvalidTileHashKey(st.tileID, x, y, leftTile.tileID)
              ]?.includes(st.tileVersionIndex)
          );
        }
        if (!nextTile) {
          addInvalidTileVersion(
            leftTile.tileID,
            x - 1,
            y,
            x - 1 == 0 && y == 0 ? null : leftTile.otherTileID,
            leftTile.tileVersionIndex
          );
          x -= 2;
          if (x < 0) {
            x = 0;
            y--;
            break;
          }
          continue;
        }
      } else if (upperTile) {
        upperTile = graph[upperTile.tileID][upperTile.tileVersionIndex].find(
          (st) =>
            st.edgeDirection === EdgeDirection.Down &&
            !invalidTileVersions[
              getInvalidTileHashKey(st.tileID, x, y, upperTile.tileID)
            ]?.includes(st.tileVersionIndex)
        );

        nextTile = graph[upperTile.otherTileID][
          upperTile.otherTileVersionIndex
        ].find(
          (st) =>
            st.edgeDirection === EdgeDirection.Up &&
            st.otherTileID === upperTile.tileID &&
            !invalidTileVersions[
              getInvalidTileHashKey(st.tileID, x, y, upperTile.tileID)
            ]?.includes(st.tileVersionIndex)
        );
        if (!nextTile) {
          addInvalidTileVersion(
            upperTile.tileID,
            x,
            y - 1,
            y - 1 == 0 && x == 0 ? null : upperTile.otherTileID,
            upperTile.tileVersionIndex
          );
          y -= 2;
          break;
        }
      } else {
        throw new Error(`Unknown next tile x=${x},y=${y}`);
      }
      image[y][x] = nextTile;
    }
  }
  // console.log(
  //   image
  //     .map((r) =>
  //       r.map((ti) => `${ti.tileID}:${ti.tileVersionIndex}`).join("    ")
  //     )
  //     .join("\n")
  // );
  return image.map((row) => {
    return row.map((tc) => ({
      tileID: tc.tileID,
      tileVersion: tc.tileVersionIndex,
    }));
  });
};

export const constructImage = (
  tiles: Tile[],
  imageConfig: ImageConfiguration
): TileContents => {
  const size = Math.sqrt(tiles.length);
  let tileSize = tiles[0].versions[0].contents.length;
  let pixelSize = size * tileSize;
  const asciiImage: Pixel[][] = [];
  const imageContents = imageConfig.map((row) => {
    return row.map((imagePart) => {
      return tiles
        .find((t) => t.ID === imagePart.tileID)
        .versions[imagePart.tileVersion].contents.slice(1, tileSize - 1)
        .map((tileRow) => tileRow.slice(1, tileSize - 1));
    });
  });
  tileSize -= 2;
  pixelSize = size * tileSize;
  for (let y = 0; y < pixelSize; y++) {
    const currentTiles = imageContents[Math.floor(y / tileSize)];
    const foo = currentTiles.reduce((reduction, tileContents) => {
      const currentSlice = tileContents[y % tileSize];
      return [...reduction, ...currentSlice];
    }, [] as Pixel[]);
    asciiImage.push(foo as Pixel[]);
  }
  return asciiImage;
};

export const getPossibleUpperLeftCornerTiles = (
  graph: TileConnections
): TileConnection[] => {
  const graphConnections: { [tileID: string]: Set<string> } = Object.entries(
    graph
  ).reduce((reduction, [tileID, connections]) => {
    reduction[tileID] = new Set();
    Object.values(connections).forEach((versionConnections) => {
      versionConnections.forEach((vc) => reduction[tileID].add(vc.otherTileID));
    });
    return reduction;
  }, {});

  const cornerTileIDs = Object.entries(graphConnections)
    .filter(([, connections]) => connections.size === 2)
    .map((ct) => ct[0]);

  return Object.values(cornerTileIDs).reduce((reduction, tileID) => {
    Object.values(graph[tileID])
      .filter(
        (tcs) =>
          tcs.some((tc) => tc.edgeDirection === "RIGHT") &&
          tcs.some((tc) => tc.edgeDirection === "DOWN")
      )
      .forEach((tcs) => {
        reduction.push(tcs.find((tc) => tc.edgeDirection === "RIGHT"));
      });
    return reduction;
  }, []);
};

export const revealSeaMonsters = (image: Pixel[][]): boolean => {
  const REPLACE_INDEXES = [
    { line: 0, col: 18 },
    { line: 1, col: 0 },
    { line: 1, col: 5 },
    { line: 1, col: 6 },
    { line: 1, col: 11 },
    { line: 1, col: 12 },
    { line: 1, col: 17 },
    { line: 1, col: 18 },
    { line: 1, col: 19 },
    { line: 2, col: 1 },
    { line: 2, col: 4 },
    { line: 2, col: 7 },
    { line: 2, col: 10 },
    { line: 2, col: 13 },
    { line: 2, col: 16 },
  ];

  const imageString = image.map((r) => r.join("")).join("\n");
  let solutionFound = false;
  let initialIndex = imageString.indexOf("###");
  const size = image.length;

  while (initialIndex > 0) {
    const effectiveSize = size + 1; // never forget your newline characters ;)
    const baseX = (initialIndex % effectiveSize) - 17;
    const baseY = Math.floor(initialIndex / effectiveSize) - 1;
    if (
      baseX < 0 ||
      baseX > size - 1 - 19 ||
      baseY < 0 ||
      baseY > size - 1 - 2
    ) {
      initialIndex = imageString.indexOf("###", initialIndex + 1);
      continue;
    }
    const monsterAtCurrentIndex = REPLACE_INDEXES.reduce(
      (bool, { line, col }) => bool && image[line + baseY][col + baseX] === "#",
      true
    );
    if (monsterAtCurrentIndex) {
      REPLACE_INDEXES.forEach(
        ({ line, col }) => (image[line + baseY][col + baseX] = "O")
      );
    }
    solutionFound ||= monsterAtCurrentIndex;
    initialIndex = imageString.indexOf("###", initialIndex + 1);
  }
  return solutionFound;
};

const moduleB = (input: string): number => {
  const tiles = input.split("\n\n").map((tileString) => new Tile(tileString));

  const graph = calculateTileConnections(tiles);

  const firstCornerVersions = getPossibleUpperLeftCornerTiles(graph);

  const imageConfig = findBestImageFit(tiles, graph, firstCornerVersions);

  const img = constructImage(tiles, imageConfig);
  const r90 = rotateMatrix(img);
  const r180 = rotateMatrix(r90);
  const r270 = rotateMatrix(r180);
  const flipHr = flipMatrixHr(img);
  const flip90Hr = flipMatrixHr(r90);
  const flipVt = flipMatrixVt(img);
  const flip90Vt = flipMatrixVt(r90);

  let result: number;

  [img, r90, r180, r270, flipHr, flip90Hr, flipVt, flip90Vt].forEach((perm) => {
    if (revealSeaMonsters(perm)) {
      result = perm
        .map((r) => r.join(""))
        .join("")
        .replace(/\.|O/g, "").length;
    }
  });

  /*
   * we assume that there is only one solution to the problem
   */
  return result;
};

export default moduleB;
