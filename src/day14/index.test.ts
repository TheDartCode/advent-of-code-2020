import day14 from "./index";

const TEST_DATA = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const TEST_DATA_B = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

describe("day14", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day14("a", TEST_DATA)).toBe("165");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day14("b", TEST_DATA_B)).toBe("208");
    });
  });
});
