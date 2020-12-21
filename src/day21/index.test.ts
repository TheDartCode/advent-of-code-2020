import day21 from "./index";
import { calculateAllergenWeights, parseInput } from "./helpers";

const TEST_DATA = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

describe("day21", () => {
  describe("helpers", () => {
    describe("#parseInput()", () => {
      it("correctly parses allergen statements", () => {
        expect(parseInput(TEST_DATA)).toEqual({
          allergens: ["dairy", "fish", "soy"],
          ingredients: [
            "mxmxvkd",
            "kfcds",
            "sqjhc",
            "nhms",
            "trh",
            "fvjkl",
            "sbzzf",
          ],
          statements: [
            {
              ingredients: ["mxmxvkd", "kfcds", "sqjhc", "nhms"],
              allergens: ["dairy", "fish"],
            },
            {
              ingredients: ["trh", "fvjkl", "sbzzf", "mxmxvkd"],
              allergens: ["dairy"],
            },
            {
              ingredients: ["sqjhc", "fvjkl"],
              allergens: ["soy"],
            },
            {
              ingredients: ["sqjhc", "mxmxvkd", "sbzzf"],
              allergens: ["fish"],
            },
          ],
        });
      });
      describe("#calculateAllergenWeights()", () => {
        const result = calculateAllergenWeights(
          parseInput(TEST_DATA).statements
        );
        expect(result).toEqual({
          dairy: {
            mxmxvkd: 1 / 4 + 1 / 4,
            kfcds: 1 / 4,
            sqjhc: 1 / 4,
            nhms: 1 / 4,
            sbzzf: 1 / 4,
            fvjkl: 1 / 4,
            trh: 1 / 4,
          },
          fish: {
            mxmxvkd: 1 / 4 + 1 / 3,
            kfcds: 1 / 4,
            sqjhc: 1 / 4 + 1 / 3,
            nhms: 1 / 4,
            sbzzf: 1 / 3,
          },
          soy: {
            sqjhc: 1 / 2,
            fvjkl: 1 / 2,
          },
        });
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day21("a", TEST_DATA)).toBe("5");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day21("b", TEST_DATA)).toBe("mxmxvkd,sqjhc,fvjkl");
    });
  });
});
