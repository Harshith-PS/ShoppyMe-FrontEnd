import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICart } from 'src/app/ShoppyMe-Interfaces/cart';
import { IRoles } from 'src/app/ShoppyMe-Interfaces/roles';
import { IUsers } from 'src/app/ShoppyMe-Interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateCredentials(id: string, password: string): Observable<any> {
    const userObj = {
      "emailId": id,
      "userPassword": password
    }
    return this.http.post<any>('http://localhost:8080/shoppyme/validateuser', userObj).pipe(catchError(this.errorHandler));
  }

  addProductToCart(productId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: 1 };
    return this.http.post<boolean>('http://localhost:8080/shoppyme/addProductToCart', cartObj).pipe(catchError(this.errorHandler));
  }

  addNewCustomer(emailId: string, password: string, gender: string, dateOfBirth : Date, address : string): Observable<boolean> {
    var userObj: IUsers;
    var roleObj : IRoles
    roleObj = { roleId: 2, roleName: 'Customer' };
    userObj = { emailId :emailId ,role :roleObj , gender:gender, userPassword:password, dateOfBirth:dateOfBirth , address:address };
    return this.http.post<boolean>('http://localhost:8080/shoppyme/user', userObj).pipe(catchError(this.errorHandler));
  }
 
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
