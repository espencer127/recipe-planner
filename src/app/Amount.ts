export class Amount {
    qty: string;
    unit: string;

    constructor(data?: { qty?: any; unit?: any; }) {
        data = data || {};
        this.qty = data.qty;
        this.unit = data.unit;
    }
}