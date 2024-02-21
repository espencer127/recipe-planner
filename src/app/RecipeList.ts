import { Recipe } from "./Recipe";

export class RecipeList {
    recipes: Recipe[];

    constructor(recipes?: any) {
        this.recipes = recipes;
    }
}