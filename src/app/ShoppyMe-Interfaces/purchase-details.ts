import { DatePipe } from "@angular/common"
import { IProduct } from "./product"
import { IUsers } from "./users"

export interface IPuchaseDetails{
    purchaseId : number
    user : IUsers
    productDTO : IProduct
    quantityPurchased : number
    dateOfPurchase : Date
}