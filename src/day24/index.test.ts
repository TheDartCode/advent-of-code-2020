import day24 from "./index";
import {
  expandFloor,
  initializeFloor,
  mapPathToCoords,
  parseInput,
} from "./helpers";
import { TileEdge, TileFace } from "./types";
import { simulateDay } from "./moduleB";

const TEST_DATA = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

describe("day24", () => {
  describe("helpers", () => {
    describe("parseInput", () => {
      it("parses the list of directions", () => {
        expect(
          parseInput(TEST_DATA.split("\n").slice(0, 3).join("\n"))
        ).toEqual([
          [
            TileEdge.se,
            TileEdge.se,
            TileEdge.nw,
            TileEdge.ne,
            TileEdge.ne,
            TileEdge.ne,
            TileEdge.w,
            TileEdge.se,
            TileEdge.e,
            TileEdge.sw,
            TileEdge.w,
            TileEdge.sw,
            TileEdge.sw,
            TileEdge.w,
            TileEdge.ne,
            TileEdge.ne,
            TileEdge.w,
            TileEdge.se,
            TileEdge.w,
            TileEdge.sw,
          ],
          [
            TileEdge.ne,
            TileEdge.e,
            TileEdge.e,
            TileEdge.ne,
            TileEdge.se,
            TileEdge.nw,
            TileEdge.nw,
            TileEdge.w,
            TileEdge.sw,
            TileEdge.ne,
            TileEdge.ne,
            TileEdge.w,
            TileEdge.nw,
            TileEdge.w,
            TileEdge.se,
            TileEdge.w,
            TileEdge.ne,
            TileEdge.nw,
            TileEdge.se,
            TileEdge.sw,
            TileEdge.e,
            TileEdge.sw,
          ],
          [
            TileEdge.se,
            TileEdge.sw,
            TileEdge.ne,
            TileEdge.sw,
            TileEdge.sw,
            TileEdge.se,
            TileEdge.nw,
            TileEdge.w,
            TileEdge.nw,
            TileEdge.se,
          ],
        ]);
      });
    });
    describe("mapPathToCoords", () => {
      it("maps a series of edge directions to the destination coords", () => {
        expect(mapPathToCoords([TileEdge.e, TileEdge.se, TileEdge.w])).toEqual({
          x: 0,
          y: -1,
          z: 1,
        });
        expect(mapPathToCoords(parseInput("nwwswee")[0])).toEqual({
          x: 0,
          y: 0,
          z: 0,
        });
        expect(mapPathToCoords(parseInput("nwwswee")[0])).toEqual({
          x: 0,
          y: 0,
          z: 0,
        });
        expect(mapPathToCoords(parseInput("nwnenweese")[0])).toEqual({
          x: 3,
          y: -1,
          z: -2,
        });

        expect(parseInput(TEST_DATA).map(mapPathToCoords)).toEqual([
          {
            x: -3,
            y: 1,
            z: 2,
          },
          {
            x: 1,
            y: 2,
            z: -3,
          },
          {
            x: -3,
            y: 0,
            z: 3,
          },
          {
            x: 2,
            y: 0,
            z: -2,
          },
          {
            x: 1,
            y: 1,
            z: -2,
          },
          {
            x: -1,
            y: 1,
            z: 0,
          },
          {
            x: 1,
            y: 2,
            z: -3,
          },
          {
            x: -2,
            y: 2,
            z: 0,
          },
          {
            x: 0,
            y: 1,
            z: -1,
          },
          {
            x: -2,
            y: 1,
            z: 1,
          },
          {
            x: 0,
            y: 2,
            z: -2,
          },
          {
            x: 0,
            y: 2,
            z: -2,
          },
          {
            x: 3,
            y: 0,
            z: -3,
          },
          {
            x: -1,
            y: 1,
            z: 0,
          },
          {
            x: 0,
            y: -2,
            z: 2,
          },
          {
            x: 0,
            y: 0,
            z: 0,
          },
          {
            x: 1,
            y: 1,
            z: -2,
          },
          {
            x: 2,
            y: 0,
            z: -2,
          },
          {
            x: 2,
            y: -2,
            z: 0,
          },
          {
            x: -1,
            y: 2,
            z: -1,
          },
        ]);
      });
    });
    describe("initializeFloor", () => {
      it("generates all tiles referenced by the paths along with their inner neighbors, setting colors accordingly", () => {
        const paths = parseInput(TEST_DATA);

        let floor = initializeFloor(paths);

        expect(
          Object.entries(floor.tiles).map(([key, { face }]) => [key, face])
        ).toEqual([
          ["0_0_0", 1],
          ["-3_1_2", 1],
          ["1_2_-3", 0],
          ["-3_0_3", 1],
          ["2_0_-2", 0],
          ["1_1_-2", 0],
          ["-1_1_0", 0],
          ["-2_2_0", 1],
          ["0_1_-1", 1],
          ["-2_1_1", 1],
          ["0_2_-2", 0],
          ["3_0_-3", 1],
          ["0_-2_2", 1],
          ["2_-2_0", 1],
          ["-1_2_-1", 1],
          ["1_-1_0", 0],
          ["0_-1_1", 0],
          ["-1_0_1", 0],
          ["1_0_-1", 0],
          ["1_-2_1", 0],
          ["2_-1_-1", 0],
          ["-1_-1_2", 0],
          ["-2_0_2", 0],
          ["3_-1_-2", 0],
          ["2_1_-3", 0],
          ["-3_2_1", 0],
          ["-3_3_0", 0],
          ["-2_3_-1", 0],
          ["-1_3_-2", 0],
          ["0_3_-3", 0],
          ["1_-3_2", 0],
          ["0_-3_3", 0],
          ["-1_-2_3", 0],
          ["3_-3_0", 0],
          ["2_-3_1", 0],
          ["3_-2_-1", 0],
          ["-2_-1_3", 0],
        ]);

        expect(floor.layers).toEqual({
          "0": ["0_0_0"],
          "1": ["-1_1_0", "0_1_-1", "1_-1_0", "0_-1_1", "-1_0_1", "1_0_-1"],
          "2": [
            "2_0_-2",
            "1_1_-2",
            "-2_2_0",
            "-2_1_1",
            "0_2_-2",
            "0_-2_2",
            "2_-2_0",
            "-1_2_-1",
            "1_-2_1",
            "2_-1_-1",
            "-1_-1_2",
            "-2_0_2",
          ],
          "3": [
            "-3_1_2",
            "1_2_-3",
            "-3_0_3",
            "3_0_-3",
            "3_-1_-2",
            "2_1_-3",
            "-3_2_1",
            "-3_3_0",
            "-2_3_-1",
            "-1_3_-2",
            "0_3_-3",
            "1_-3_2",
            "0_-3_3",
            "-1_-2_3",
            "3_-3_0",
            "2_-3_1",
            "3_-2_-1",
            "-2_-1_3",
          ],
        });
      });
    });
    describe("expandFloor", () => {
      it("adds an extra layer of tiles, initialized to Black", () => {
        const paths = [[]];

        let floor = initializeFloor(paths);

        expect(floor.layers).toEqual({ 0: ["0_0_0"] });

        expandFloor(floor);

        expect(floor.layers).toEqual({
          "0": ["0_0_0"],
          "1": ["1_-1_0", "0_-1_1", "-1_0_1", "-1_1_0", "0_1_-1", "1_0_-1"],
        });

        expandFloor(floor);

        expect(floor.layers).toEqual({
          "0": ["0_0_0"],
          "1": ["1_-1_0", "0_-1_1", "-1_0_1", "-1_1_0", "0_1_-1", "1_0_-1"],
          "2": [
            "2_-2_0",
            "1_-2_1",
            "2_-1_-1",
            "0_-2_2",
            "-1_-1_2",
            "-2_0_2",
            "-2_1_1",
            "-2_2_0",
            "-1_2_-1",
            "0_2_-2",
            "1_1_-2",
            "2_0_-2",
          ],
        });
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day24("a", TEST_DATA)).toBe("10");
    });
  });
  describe("second part", () => {
    describe("simulateDay", () => {
      it("flips all tiles based on rules, expanding the floor 1 layer further", () => {
        const paths = parseInput(TEST_DATA);

        let floor = initializeFloor(paths);
        expect(
          Object.values(floor.tiles).filter(
            (tile) => tile.face === TileFace.Black
          ).length
        ).toEqual(10);

        // give extraordinary free space around, to ensure that over-expansion does not affect tile-flipping
        expandFloor(floor);
        expandFloor(floor);
        expandFloor(floor);
        expandFloor(floor);

        expect(
          Object.values(floor.tiles).filter(
            (tile) => tile.face === TileFace.Black
          ).length
        ).toEqual(10);

        floor = simulateDay(floor);

        expect(
          Object.values(floor.tiles).filter(
            (tile) => tile.face === TileFace.Black
          ).length
        ).toEqual(15);

        floor = simulateDay(floor);

        expect(
          Object.values(floor.tiles).filter(
            (tile) => tile.face === TileFace.Black
          ).length
        ).toEqual(12);

        floor = simulateDay(floor);

        expect(
          Object.values(floor.tiles).filter(
            (tile) => tile.face === TileFace.Black
          ).length
        ).toEqual(25);
      });
    });
    it("satisfies test data", () => {
      expect(day24("b", TEST_DATA)).toBe("2208");
    });
  });
});
