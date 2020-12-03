import moduleB from "./moduleB";

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
  describe("moduleB", () => {
    it("satisfies test data", () => {
      expect(moduleB(TEST_DATA)).toBe(336);
    });
  });
});
