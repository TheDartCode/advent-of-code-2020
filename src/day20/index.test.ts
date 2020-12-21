import {
  calculateTileConnections,
  flipMatrix,
  flipMatrixHr,
  flipMatrixVt,
  rotateMatrix,
} from "./helpers";
import day20 from "./index";
import { Tile } from "./types";

const TEST_DATA = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

describe("day20", () => {
  describe("helpers", () => {
    describe("rotateMatrix", () => {
      it("rotates a given matrix 90° clockwise", () => {
        expect(
          rotateMatrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ])
        ).toEqual([
          [7, 4, 1],
          [8, 5, 2],
          [9, 6, 3],
        ]);
        expect(
          rotateMatrix(
            rotateMatrix([
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ])
          )
        ).toEqual([
          [9, 8, 7],
          [6, 5, 4],
          [3, 2, 1],
        ]);
      });
    });
    describe("flipMatrixHr", () => {
      it("flips a given matrix horizontally", () => {
        expect(
          flipMatrixHr([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ])
        ).toEqual([
          [3, 2, 1],
          [6, 5, 4],
          [9, 8, 7],
        ]);
      });
    });
    describe("flipMatrixVt", () => {
      it("flips a given matrix vertically", () => {
        expect(
          flipMatrixVt([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ])
        ).toEqual([
          [7, 8, 9],
          [4, 5, 6],
          [1, 2, 3],
        ]);
      });
    });
    describe("flipMatrix", () => {
      it("flips a given matrix in both directions", () => {
        expect(
          flipMatrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ])
        ).toEqual([
          [9, 8, 7],
          [6, 5, 4],
          [3, 2, 1],
        ]);
      });
    });
    describe("matrix transformations", () => {
      it("sanity check", () => {
        const matrix = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ];
        const r90 = rotateMatrix(matrix);
        const r180 = rotateMatrix(r90);
        const r270 = rotateMatrix(r180);
        const r360 = rotateMatrix(r270);

        const permutations: [number[][], string][] = [
          [matrix, "matrix"],
          [flipMatrixHr(matrix), "flipMatrixHr(matrix)"],
          [flipMatrixVt(matrix), "flipMatrixVt(matrix)"],
          [flipMatrix(matrix), "flipMatrix(matrix)"],
          [r90, "r90"],
          [flipMatrixHr(r90), "flipMatrixHr(r90)"],
          [flipMatrixVt(r90), "flipMatrixVt(r90)"],
          [flipMatrix(r90), "flipMatrix(r90)"],
          [r180, "r180"],
          [flipMatrixHr(r180), "flipMatrixHr(r180)"],
          [flipMatrixVt(r180), "flipMatrixVt(r180)"],
          [flipMatrix(r180), "flipMatrix(r180)"],
          [r270, "r270"],
          [flipMatrixHr(r270), "flipMatrixHr(r270)"],
          [flipMatrixVt(r270), "flipMatrixVt(r270)"],
          [flipMatrix(r270), "flipMatrix(r270)"],
          [r360, "r360"],
          [flipMatrixHr(r360), "flipMatrixHr(r360)"],
          [flipMatrixVt(r360), "flipMatrixVt(r360)"],
          [flipMatrix(r360), "flipMatrix(r360)"],
        ];

        const uniquePermutations: {
          [name: string]: string;
        } = permutations.reduce((reduction, [m, name]) => {
          const stringifiedMatrix = m.map((row) => row.join("")).join("");
          reduction[stringifiedMatrix] = [
            ...(reduction[stringifiedMatrix] || []),
            name,
          ];
          return reduction;
        }, {});
        expect(uniquePermutations).toEqual({
          "123456789": ["matrix", "flipMatrix(r180)", "r360"],
          "147258369": ["flipMatrixHr(r90)", "flipMatrixVt(r270)"],
          "321654987": [
            "flipMatrixHr(matrix)",
            "flipMatrixVt(r180)",
            "flipMatrixHr(r360)",
          ],
          "369258147": ["flipMatrix(r90)", "r270"],
          "741852963": ["r90", "flipMatrix(r270)"],
          "789456123": [
            "flipMatrixVt(matrix)",
            "flipMatrixHr(r180)",
            "flipMatrixVt(r360)",
          ],
          "963852741": ["flipMatrixVt(r90)", "flipMatrixHr(r270)"],
          "987654321": ["flipMatrix(matrix)", "r180", "flipMatrix(r360)"],
        });
      });
    });
  });
  describe("Tile", () => {
    it("parses the text representation of a Tile correctly", () => {
      expect(new Tile(TEST_DATA.split("\n\n")[0]).toJson()).toEqual({
        ID: "2311",
        contents: [
          [".", ".", "#", "#", ".", "#", ".", ".", "#", "."],
          ["#", "#", ".", ".", "#", ".", ".", ".", ".", "."],
          ["#", ".", ".", ".", "#", "#", ".", ".", "#", "."],
          ["#", "#", "#", "#", ".", "#", ".", ".", ".", "#"],
          ["#", "#", ".", "#", "#", ".", "#", "#", "#", "."],
          ["#", "#", ".", ".", ".", "#", ".", "#", "#", "#"],
          [".", "#", ".", "#", ".", "#", ".", ".", "#", "#"],
          [".", ".", "#", ".", ".", ".", ".", "#", ".", "."],
          ["#", "#", "#", ".", ".", ".", "#", ".", "#", "."],
          [".", ".", "#", "#", "#", ".", ".", "#", "#", "#"],
        ],
      });
    });
    describe("#versions", () => {
      it("generates all valid permutation of the contents", () => {
        const tile = new Tile(TEST_DATA.split("\n\n")[0]);
        expect(
          tile.versions.map(({ name, contents }) =>
            contents.map((r) => r.join("")).join("")
          )
        ).toEqual([
          "..##.#..#.##..#.....#...##..#.####.#...###.##.###.##...#.###.#.#.#..##..#....#..###...#.#...###..###",
          ".#..#####..#.####.#.###...#..##..#.##..##....#.##....##.##.#.#...#....#.#.##....##.###.#.##..##.#...",
          "###..###...#.#...###..#....#..##..#.#.#.###.#...##.###.##.###...#.####.#..##...#.....#..##.#..#.##..",
          "...#.##..##.#.###.##....##.#.#....#...#.#.##.##....##.#....##..##.#..##..#...###.#.####.#..#####..#.",
          ".#..#.##.......#..##.#..##...##...#.####.###.##.#####.#...####..#.#.#...#....#...#.#...######..###..",
          ".#####..#..#.####.#.#..#...####..##.#..#.##.#....##.##.##.......#...#.....##.#.##.#.###.##...#.##..#",
          "..###..######...#.#...#....#...#.#.#..####...#.#####.##.###.####.#...##...##..#.##..#.......##.#..#.",
          "#..##.#...##.###.#.##.#.##.....#...#.......##.##.##....#.##.#..#.##..####...#..#.#.####.#..#..#####.",
        ]);
      });
    });
  });
  describe("first part", () => {
    describe("#calculateTileConnections()", () => {
      it("finds all matching tiles", () => {
        const tiles = TEST_DATA.split("\n\n").map(
          (tileString) => new Tile(tileString)
        );

        const graph = calculateTileConnections(tiles);
      });
    });
    it("satisfies test data", () => {
      expect(day20("a", TEST_DATA)).toBe("20899048083289");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day20("b", TEST_DATA)).toBe("1");
    });
  });
});
