import { parseInput } from "./helpers";
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
  describe("#parseInput", () => {
    it("correctly parses list of rules and messages", () => {
      const result = parseInput(TEST_DATA);
      expect(result.rules.map((r) => r.toJson())).toEqual([
        { id: 0, contents: [[4, 1, 5]] },
        {
          id: 1,
          contents: [
            [2, 3],
            [3, 2],
          ],
        },
        {
          id: 2,
          contents: [
            [4, 4],
            [5, 5],
          ],
        },
        {
          id: 3,
          contents: [
            [4, 5],
            [5, 4],
          ],
        },
        { id: 4, contents: "a" },
        { id: 5, contents: "b" },
      ]);
      expect(result.messages).toEqual([
        "ababbb",
        "bababa",
        "abbbab",
        "aaabbb",
        "aaaabbb",
      ]);
    });
  });
  describe("Rule", () => {
    describe("#getRegexString", () => {
      it("generates a valid regex matcher", () => {
        const { rules } = parseInput(TEST_DATA);
        const matcher4 = "a";
        const matcher5 = "b";
        const matcher2 = `(?:${matcher4}${matcher4}|${matcher5}${matcher5})`;
        const matcher3 = `(?:${matcher4}${matcher5}|${matcher5}${matcher4})`;
        const matcher1 = `(?:${matcher2}${matcher3}|${matcher3}${matcher2})`;
        const matcher0 = `(?:${matcher4}${matcher1}${matcher5})`;
        expect(rules[4].getRegexString()).toEqual(matcher4);
        expect(rules[5].getRegexString()).toEqual(matcher5);
        expect(rules[2].getRegexString()).toEqual(matcher2);
        expect(rules[3].getRegexString()).toEqual(matcher3);
        expect(rules[1].getRegexString()).toEqual(matcher1);
        expect(rules[0].getRegexString()).toEqual(matcher0);
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day19("a", TEST_DATA)).toBe("2");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day19("b", TEST_DATA)).toBe("1");
    });
  });
});
