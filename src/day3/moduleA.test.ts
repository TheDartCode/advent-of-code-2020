import { calculatePath } from "./helpers";
import moduleA from "./moduleA";

const TEST_DATA = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

describe("day3", () => {
  describe("moduleA", () => {
    it("satisfies test data", () => {
      expect(moduleA(TEST_DATA)).toBe(7);
    });
  });
});
