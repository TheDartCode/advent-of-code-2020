import day6 from "./index";

const TEST_DATA = `abc

a
b
c

ab
ac

a
a
a
a

b`;

describe("day6", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day6('a', TEST_DATA)).toBe('11');
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day6('b', TEST_DATA)).toBe('6');
    });
  });
});
