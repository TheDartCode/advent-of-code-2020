import day16 from "./index";
import { parseData } from "./helpers";

const TEST_DATA = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const TEST_DATA_B = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

describe("day16", () => {
  describe("first part", () => {
    describe("#parseData", () => {
      it("parses data string creating the respective object", () => {
        expect(parseData(TEST_DATA)).toEqual({
          rules: [
            {
              fieldName: "class",
              ranges: [
                { min: 1, max: 3 },
                { min: 5, max: 7 },
              ],
            },
            {
              fieldName: "row",
              ranges: [
                { min: 6, max: 11 },
                { min: 33, max: 44 },
              ],
            },
            {
              fieldName: "seat",
              ranges: [
                { min: 13, max: 40 },
                { min: 45, max: 50 },
              ],
            },
          ],
          ownTicket: [7, 1, 14],
          otherTickets: [
            [7, 3, 47],
            [40, 4, 50],
            [55, 2, 20],
            [38, 6, 12],
          ],
        });
      });
    });
    it("satisfies test data", () => {
      expect(day16("a", TEST_DATA)).toBe("71");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day16("b", TEST_DATA_B, /class|seat/)).toBe("156");
    });
  });
});
