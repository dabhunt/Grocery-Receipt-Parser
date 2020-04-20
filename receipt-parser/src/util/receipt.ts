import {Food} from "./food";
export class Receipt {
    purchase_Date: Date;
    created_by?: string;
    moneySpent?: number;
    storeName: string;
    foods?: Food[]; 
    constructor(purchase_Date: Date, storeName: string, moneySpent: number) {
      this.purchase_Date = purchase_Date;
      this.storeName = storeName;
      this.moneySpent = moneySpent;
      this.foods = [];
    }

}
export class StoreSpecificParsingRules
{
    linesToSkip: number;
    //comma seperated list of characters that mean the line should be ignored
    ignoredStringValues: string[];
    endKeyWord: string;
}
export interface Pantry {
    foods: Food[];
}