import day5 from "./index";
import { SeatFinder, Tree, TreeBisection } from "./helpers";

const TEST_DATA = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

describe("day5", () => {
  describe("Tree", () => {
    it("creates a binary Tree with the correct leaves", () => {
      const tree = new Tree(16);
      expect(tree.leaves.map(l => l.label)).toEqual([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15
      ]);
    });

    describe("#navigate", () => {
      it("navigates correctly to specified leaf", () => {
        const tree = new Tree(16);
        expect(tree.navigate("LLRR".split("") as TreeBisection[])).toEqual({
          label: 3
        });
      });
    });
  });
  describe("SeatFinder", () => {
    it("find a seat given the binary path", () => {
      const seatFinder = new SeatFinder();
      expect(seatFinder.findSeat("FBFBBFFRLR")).toEqual({
        row: 44,
        column: 5
      });
      expect(seatFinder.findSeat("BFFFBBFRRR")).toEqual({ column: 7, row: 70 });
      expect(seatFinder.findSeat("FFFBBBFRRR")).toEqual({ column: 7, row: 14 });
      expect(seatFinder.findSeat("BBFFBBFRLL")).toEqual({
        column: 4,
        row: 102
      });
    });
    it("calculates the ID for a given seat path", () => {
      const seatFinder = new SeatFinder();
      expect(seatFinder.getSeatID({ row: 44, column: 5 })).toEqual(357);
      expect(seatFinder.getSeatID({ column: 7, row: 70 })).toEqual(567);
      expect(seatFinder.getSeatID({ column: 7, row: 14 })).toEqual(119);
      expect(seatFinder.getSeatID({ column: 4, row: 102 })).toEqual(820);
    });
  });
  describe("first part", () => {
    it("finds the highest seat ID from a list", () => {
      expect(day5("a", TEST_DATA)).toBe("820");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day5("b", TEST_DATA)).toBe(1);
    });
  });
});
