import { Amount } from "./Amount";

export class Ing {
    amt: Amount;
    item: string;

    constructor(amt: any, item: any) {
        this.amt = amt;
        this.item = item;
    }
}