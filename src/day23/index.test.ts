import day23 from "./index";
import { clip, parseInput } from "./helpers";

const TEST_DATA = `389125467`;

describe("day23", () => {
  describe("helpers", () => {
    describe("parseInput", () => {
      it("parses the cups maintaining order", () => {
        expect(parseInput(TEST_DATA).toJson()).toEqual([
          { label: 3, next: 8 },
          { label: 8, next: 9 },
          { label: 9, next: 1 },
          { label: 1, next: 2 },
          { label: 2, next: 5 },
          { label: 5, next: 4 },
          { label: 4, next: 6 },
          { label: 6, next: 7 },
          { label: 7, next: 3 },
        ]);
      });
    });
    describe("clip", () => {
      it("cycles cups when their labels exceed the boundaries", () => {
        expect(clip(5, 1, 4)).toEqual(1);
        expect(clip(5, 6, 9)).toEqual(9);
      });
    });
  });
  describe("Game", () => {
    describe("#findDestinationCup()", () => {
      it("finds the destination index when initial destination is picked up", () => {
        const game = parseInput(TEST_DATA);
        expect(
          game.findDestinationCup(game, game.cups[1], game.cups.slice(2, 5))
            .label
        ).toEqual(7);
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day23("a", TEST_DATA)).toBe("67384529");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day23("b", TEST_DATA)).toBe("149245887792");
    });
  });
});
