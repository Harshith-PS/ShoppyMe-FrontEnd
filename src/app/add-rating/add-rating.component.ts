import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../ShoppyMe-Services/product-service/product.service';
import { UserService } from '../ShoppyMe-Services/user-service/user.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {
  msg : string='';
  userName: any;
  shwMsg : boolean= false;
  userRole : any;
  customerLayout: boolean=false;
  commonLayout: boolean=false;
  productId: any;
  productName: any;

  ngOnInit()  {    
    this.productId = this.router.snapshot.params['productId'];
    this.productName = this.router.snapshot.params['productName'];
  }

  constructor(private productService : ProductService, private route : Router,private router: ActivatedRoute){
    this.userRole = sessionStorage.getItem('userRole');
    this.userName= sessionStorage.getItem('userName');
    if (this.userRole == "2") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
     }

  submitRating(form : NgForm){
    this.productService.addRating(this.productId,this.productName,form.value.rating,form.value.comments,'Franken@gmail.com').subscribe(
      data => {
         if(data==true){
            this.msg='Thanks for your valuable feedback';
            this.shwMsg=true;
            alert("Review added sucessfully.")
            this.route.navigate(['/purchaseDetails'])
        }        
      },
      responseLoginError => {
        this.msg = 'Something went wrong';
        this.shwMsg=true;
        console.log(this.msg);
      },
      () => console.log("submitRating method excuted successfully")
    );
  }

}

// Comments