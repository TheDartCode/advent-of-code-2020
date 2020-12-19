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

const TEST_DATA_B = `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`;

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
    it("satisfies test data", () => {
      expect(day19("b", TEST_DATA_B)).toBe("12");
    });
  });
});
