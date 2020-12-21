import {
  Allergen,
  AllergenIngredientWeights,
  AllergenStatement,
  Ingredient,
  State,
} from "./types";

const STATEMENT_REGEX = /^([\w ]+)\(contains ([\w, ]+)\)$/gm;

export const parseInput = (input: string): State => {
  const regExp = new RegExp(STATEMENT_REGEX);

  const result: State = {
    allergens: [],
    ingredients: [],
    statements: [],
  };

  let match: RegExpExecArray;
  while ((match = regExp.exec(input))) {
    const [, ingredientString, allergenString] = match;
    const ingredients: Ingredient[] = ingredientString.trim().split(" ");
    const allergens: Allergen[] = allergenString.trim().split(", ");
    result.statements.push({
      ingredients,
      allergens,
    });
    ingredients
      .filter((ing) => !result.ingredients.includes(ing))
      .forEach((ing) => result.ingredients.push(ing));
    allergens
      .filter((all) => !result.allergens.includes(all))
      .forEach((all) => result.allergens.push(all));
  }

  return result;
};

export const calculateAllergenWeights = (
  allergenStatement: AllergenStatement[]
): AllergenIngredientWeights => {
  const ingredientWeights: AllergenIngredientWeights = {};

  allergenStatement.forEach(({ allergens, ingredients }) => {
    allergens.forEach((allergen) => {
      if (!ingredientWeights[allergen]) {
        ingredientWeights[allergen] = {};
      }
      const weights = ingredientWeights[allergen];
      ingredients.forEach((ingredient) => {
        if (!weights[ingredient]) {
          weights[ingredient] = 0;
        }
        weights[ingredient] += 1 / ingredients.length;
      });
    });
  });
  return ingredientWeights;
};

export const matchIngredientsToAllergens = (
  allergenStatement: AllergenStatement[],
  ingredientWeights: AllergenIngredientWeights
): Record<Ingredient, Allergen> => {
  const result: Record<Ingredient, Allergen> = {};
  let i = -1;
  while (true) {
    const remainingAllergens = Object.keys(ingredientWeights);
    if (remainingAllergens.length === 0) {
      break;
    }
    i = (i + 1) % remainingAllergens.length;
    const allergen = remainingAllergens[i];
    const weights = ingredientWeights[allergen];
    const weightValues = Object.values(weights);
    const max = Math.max(...weightValues);
    if (weightValues.filter((w) => w === max).length > 1) {
      continue;
    }
    const ingredient = Object.keys(weights).find(
      (ingr) => weights[ingr] === max
    );
    result[ingredient] = allergen;
    allergenStatement.forEach(
      (statement) =>
        (statement.ingredients = statement.ingredients.filter(
          (ing) => ing !== ingredient
        ))
    );
    allergenStatement.forEach(
      (statement) =>
        (statement.allergens = statement.allergens.filter(
          (all) => all !== allergen
        ))
    );
    ingredientWeights = calculateAllergenWeights(allergenStatement);
  }
  return result;
};
