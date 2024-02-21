import { Ingredient } from "./Ingredient";

export class Recipe {
  title: string;
  categories: string;
  diet: string;
  numIngredients: string;
  yield: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  ingredients: Ingredient;
  directions: string;
  pictureUrl: string;

  constructor(data?: { title?: any; categories?: any; diet?: any; numIngredients?: any; yield?: any; prepTime?: any; cookTime?: any; totalTime?: any; ingredients?: any; directions?: any; pictureUrl?: any; }) {
      data = data || {};
      this.title = data.title;
      this.categories = data.categories;
      this.diet = data.diet;
      this.numIngredients = data.numIngredients;
      this.yield = data.yield;
      this.prepTime = data.prepTime;
      this.cookTime = data.cookTime;
      this.totalTime = data.totalTime;
      this.ingredients = data.ingredients;
      this.directions = data.directions;
      this.pictureUrl = data.pictureUrl;
  }
}
