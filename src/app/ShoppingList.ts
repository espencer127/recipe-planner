import { IngredientOccurrence } from "./IngredientOccurrence";

export class ShoppingList {
    ingredientMap: Map<String, IngredientOccurrence[]>;

    constructor(data?: {ingredientMap?: any;}) {
        this.ingredientMap = data?.ingredientMap;
    }
}