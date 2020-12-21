import {
  calculateAllergenWeights,
  matchIngredientsToAllergens,
  parseInput,
} from "./helpers";

const moduleB = (input: string): string => {
  let { statements } = parseInput(input);
  let weights = calculateAllergenWeights(statements);

  const ingredientsToAllergensMapping = matchIngredientsToAllergens(
    statements,
    weights
  );
  return Object.entries(ingredientsToAllergensMapping)
    .sort(([, all1], [, all2]) => all1.localeCompare(all2))
    .map(([ing]) => ing)
    .join(",");
};

export default moduleB;
