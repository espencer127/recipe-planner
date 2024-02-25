import { Amount } from "./Amount";

export class IngredientOccurrence {
    recipe: string;
    amt: Amount;

    constructor(data?: {recipe: any; amount: any;}) {
        this.recipe = data?.recipe;
        this.amt = data?.amount;
    }
}