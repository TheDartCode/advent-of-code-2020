import day22 from "./index";

const TEST_DATA = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

describe("day22", () => {
  describe("first part", () => {
    it.skip("satisfies test data", () => {
      expect(day22("a", TEST_DATA)).toBe("2");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day22("b", TEST_DATA)).toBe("1");
    });
  });
});
