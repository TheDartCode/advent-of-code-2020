import {
  calculateAllergenWeights,
  matchIngredientsToAllergens,
  parseInput,
} from "./helpers";

const moduleA = (input: string): number => {
  let state = parseInput(input);
  const { statements, ingredients } = state;
  let weights = calculateAllergenWeights(statements);

  const ingredientsToAllergensMapping = matchIngredientsToAllergens(
    statements,
    weights
  );

  const allergenFreeIngredients = ingredients.filter(
    (ing) => !ingredientsToAllergensMapping[ing]
  );

  return statements.reduce((total, ast) => {
    return (
      total +
      ast.ingredients.filter((ing) => allergenFreeIngredients.includes(ing))
        .length
    );
  }, 0);
};

export default moduleA;
