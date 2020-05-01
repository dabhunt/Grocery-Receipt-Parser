//export * as utilities from "./utilities";


// export class Food {  
//   storeName?: string;
//   //generic type of food, ex: 'bread'
//   foodType?: string;
//   brand?: string;
//   //namecode is how it is reffered to on a grocery receipt
//   nameCode: string;
//   quantity: number;
//   price: number;
//   id?: number;
//   constructor(nameCode: string, storeName: string, quantity:number, price: number) {
//     this.nameCode = nameCode;
//     this.storeName = storeName;
//     this.quantity = quantity;
//     this.price = price;
//   }
// }

export interface Food {
  storeName?: string;
  //generic type of food, ex: 'bread'
  foodType?: string;
  brand?: string;
  //namecode is how it is reffered to on a grocery receipt
  nameCode: string;
  quantity: number;
  price: number;
  id?: number;
}