import day11 from "./index";

const TEST_DATA = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`;

describe("day11", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day11("a", TEST_DATA)).toBe("37");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day11("b", TEST_DATA)).toBe("26");
    });
  });
});
