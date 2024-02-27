import { Amount } from "./Amount";

export class Ing {
    amt: Amount;
    item: string;
    note: string;

    constructor(amt: any, item: any, note: any) {
        this.amt = amt;
        this.item = item;
        this.note = note;
    }
}