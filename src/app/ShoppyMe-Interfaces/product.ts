import { ICategory } from "./category";

export interface IProduct {
    productId: string;
    productName: string;
    price: number;
    quantityAvailable: number;
    categoryDTO: ICategory;
  }