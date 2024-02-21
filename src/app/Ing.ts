import { Amount } from "./Amount";

export class Ing {
    amt: Amount;
    item: string;

    constructor(data?: { amt?: any; item?: any; }) {
        data = data || {};
        this.amt = data.amt;
        this.item = data.item;
    }
}