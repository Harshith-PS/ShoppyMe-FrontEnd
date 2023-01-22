import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../ShoppyMe-Interfaces/cart';
import { IViewCart } from '../ShoppyMe-Interfaces/view-cart';
import { ProductService } from '../ShoppyMe-Services/product-service/product.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  viewCart : IViewCart[]=[];
  showMsgDiv: boolean = false;
  errMsg: any;  
  userRole: any;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  userName : any;
  status: boolean = false;
  errorMsg: any;

  ngOnInit() {
    
    this.getCartDetails();
  }

  constructor( private productService :ProductService, private route :Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName');
    if (this.userRole == "2") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
   }

  getCartDetails() {
    this.productService.getCartDetails(this.userName).subscribe(
      data => {
        this.viewCart = data
        this.showMsgDiv=false
      },
      responsePurchaseError => {
        this.viewCart = [];
        this.errMsg = responsePurchaseError;
        console.log(this.errMsg);
      },
      () => console.log("ViewCart method excuted successfully")
    );
  }
  updateCart(prod: IViewCart) {
    this.route.navigate(['/updateCart', prod.productId, prod.productName, prod.quantity, prod.quantityAvailable]);
  }

  removeProductFromCart(prod: IViewCart) {
    this.productService.deleteCartProduct(prod.productId, this.userName).subscribe(
      data => {
        this.status = data;
        if (this.status) {
          alert("Product deleted successfully.");
          this.ngOnInit();
        }
        else {
          alert("Product could not be deleted. Please try after sometime.");
        }
      },
      errorData => {
        this.errorMsg = errorData;
        alert("Something went wrong. Please try after sometime.");
      },
      () => console.log("RemoveProductFromCart method executed successfully")
    );
  }

}
