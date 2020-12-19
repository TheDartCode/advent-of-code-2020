import day19 from "./index";

const TEST_DATA = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

describe("day19", () => {
  describe("first part", () => {
    it.skip("satisfies test data", () => {
      expect(day19("a", TEST_DATA)).toBe("2");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day19("b", TEST_DATA)).toBe("1");
    });
  });
});
