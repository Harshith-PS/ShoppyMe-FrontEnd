import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICategory } from 'src/app/ShoppyMe-Interfaces/category';
import { IProduct } from 'src/app/ShoppyMe-Interfaces/product';
import { IPuchaseDetails } from 'src/app/ShoppyMe-Interfaces/purchase-details';
import { IRating } from 'src/app/ShoppyMe-Interfaces/rating';
import { IViewCart } from 'src/app/ShoppyMe-Interfaces/view-cart';
import { ICart } from 'src/app/ShoppyMe-Interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: IProduct[]=[];
  categories: ICategory[]=[];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    let tempVar = this.http.get<IProduct[]>('http://localhost:8080/shoppyme/getproduct').pipe(catchError(this.errorHandler));
    return tempVar;
  }
  
  getProductCategories() {
    let tempVar = this.http.get<ICategory[]>('http://localhost:8080/shoppyme/getcategory').pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getPurchaseDetails(userName : string) {
    let tempVar = this.http.get<IPuchaseDetails[]>('http://localhost:8080/shoppyme/getpurchase/'+userName).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getCartDetails(userName:string) {
    var requestParam = "?emailId="+userName;
    let tempVar = this.http.get<IViewCart[]>('http://localhost:8080/shoppyme/getcart'+requestParam).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  addRating(productId: string,productNmae:string, rating : string, comments : string, emailId: string): Observable<boolean> {
    var rateObj: IRating;
    rateObj = { productId: productId, emailId: emailId, productName:productNmae, reviewRating:rating, reviewComments:comments };
    return this.http.post<boolean>('http://localhost:8080/shoppyme/addRating', rateObj).pipe(catchError(this.errorHandler));
  }

  updateCart(productId: string, emailId: string, quantity : number):Observable<boolean>{
    var cartObj : ICart;
    cartObj = {productId: productId, emailId: emailId, quantity: quantity};
    console.log(cartObj)
    return this.http.put<boolean>('http://localhost:8080/shoppyme/updateCart', cartObj).pipe(catchError(this.errorHandler));
  }

  // deleteProductFromCart(emailId: string, productId: string):Observable<boolean> {
  //   var requestParam = "?emailId="+emailId+"&productId="+productId;
  //   return this.http.delete<boolean>('http://localhost:8080/shoppyme/deleteProductFromCart'+requestParam).pipe(catchError(this.errorHandler));
  // }

  deleteCartProduct(prodId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: prodId, emailId: emailId, quantity: 0 };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: cartObj };
    return this.http.delete<boolean>('http://localhost:8080/shoppyme/deleteProductFromCart', httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error("===",error);
    return throwError(error.message || "Server Error");
  } 
}
