import day10 from "./index";
import { calculateJoltageDifferences } from "./moduleA";

const TEST_DATA_SIMPLE = `16
10
15
5
1
11
7
19
6
12
4`;

const TEST_DATA = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

describe("day10", () => {
  describe("calculateJoltageDifferences", () => {
    it("returns an object with counts of joltage differences", () => {
      expect(calculateJoltageDifferences(TEST_DATA)).toEqual({
        "1": 22,
        "3": 10,
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day10("a", TEST_DATA)).toBe("220");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day10("b", TEST_DATA)).toBe("19208");
    });
  });
});
