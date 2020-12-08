import day7 from "./index";
import { constructBagsGraph } from "./helpers";

const TEST_DATA = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

describe("day7", () => {
  describe("#constructBagsGraph", () => {
    it("constructs the connected directional graph of Bag colors and contents", () => {
      expect(constructBagsGraph(TEST_DATA.split("\n"))).toEqual({
        "bright white": {
          color: "bright white",
          contents: [
            {
              color: "shiny gold",
              count: 1,
            },
          ],
        },
        "dark olive": {
          color: "dark olive",
          contents: [
            {
              color: "faded blue",
              count: 3,
            },
            {
              color: "dotted black",
              count: 4,
            },
          ],
        },
        "dark orange": {
          color: "dark orange",
          contents: [
            {
              color: "bright white",
              count: 3,
            },
            {
              color: "muted yellow",
              count: 4,
            },
          ],
        },
        "dotted black": {
          color: "dotted black",
          contents: [],
        },
        "faded blue": {
          color: "faded blue",
          contents: [],
        },
        "light red": {
          color: "light red",
          contents: [
            {
              color: "bright white",
              count: 1,
            },
            {
              color: "muted yellow",
              count: 2,
            },
          ],
        },
        "muted yellow": {
          color: "muted yellow",
          contents: [
            {
              color: "shiny gold",
              count: 2,
            },
            {
              color: "faded blue",
              count: 9,
            },
          ],
        },
        "shiny gold": {
          color: "shiny gold",
          contents: [
            {
              color: "dark olive",
              count: 1,
            },
            {
              color: "vibrant plum",
              count: 2,
            },
          ],
        },
        "vibrant plum": {
          color: "vibrant plum",
          contents: [
            {
              color: "faded blue",
              count: 5,
            },
            {
              color: "dotted black",
              count: 6,
            },
          ],
        },
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day7("a", TEST_DATA)).toBe("4");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day7("b", TEST_DATA)).toBe("32");
    });
  });
});
