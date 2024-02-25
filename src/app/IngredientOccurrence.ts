import { Amount } from "./Amount";

export class IngredientOccurrence {
    recipe: string;
    amount: Amount;

    constructor(data?: {recipe: any; amount: any;}) {
        this.recipe = data?.recipe;
        this.amount = data?.amount;
    }
}