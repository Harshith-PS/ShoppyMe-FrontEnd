import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPuchaseDetails } from '../ShoppyMe-Interfaces/purchase-details';
import { ProductService } from '../ShoppyMe-Services/product-service/product.service';

@Component({
  selector: 'app-view-purchase-details',
  templateUrl: './view-purchase-details.component.html',
  styleUrls: ['./view-purchase-details.component.css']
})
export class ViewPurchaseDetailsComponent implements OnInit {

  purchaseDetails : IPuchaseDetails[]=[];
  showMsgDiv: boolean = false;
  errMsg: any; 
  userRole: any;
  customerLayout: boolean = false;
  commonLayout: boolean = false; 
  userName : any;

  ngOnInit() {
    
    this.getPurchaseDetails();
  }

  constructor( private productService :ProductService, private route : Router) { 
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName');
    if (this.userRole == "2") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  }

  goToRating(productId:string , productName :string ){

    //this.route.navigate(['/rating'])
    this.route.navigate(['/rating', productId, productName]);
  }

  getPurchaseDetails() {
    this.productService.getPurchaseDetails(this.userName).subscribe(
      data => {
        this.purchaseDetails = data
        this.showMsgDiv=false
      },
      responsePurchaseError => {
        this.purchaseDetails = [];
        this.errMsg = responsePurchaseError;
        console.log(this.errMsg);
      },
      () => console.log("GetProducts method excuted successfully")
    );
  }

}
