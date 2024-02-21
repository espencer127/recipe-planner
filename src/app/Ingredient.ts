import { Ing } from "./Ing";

export class Ingredient {
    ing: Ing[];

    constructor(data?: { ing?: any;}) {
        data = data || {};
        this.ing = data.ing;
    }
}