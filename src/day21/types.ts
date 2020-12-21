export type Allergen = string;
export type Ingredient = string;

export type AllergenStatement = {
  ingredients: Ingredient[];
  allergens: Allergen[];
};

export type AllergenIngredientWeights = Record<
  Allergen,
  Record<Ingredient, number>
>;

export type State = {
  statements: AllergenStatement[];
  ingredients: Ingredient[];
  allergens: Allergen[];
};
