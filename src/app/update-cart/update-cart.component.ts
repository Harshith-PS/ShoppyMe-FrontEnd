import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../ShoppyMe-Services/product-service/product.service';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.css']
})
export class UpdateCartComponent implements OnInit {

  productId: string = '';
  productName: string='';
  quantity: number=0;
  quantityAvailable: number=0;
  userName: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
    this.userName = sessionStorage.getItem('userName')
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    this.productName = this.route.snapshot.params['productName'];
    this.quantity = parseInt(this.route.snapshot.params['quantity']);
    this.quantityAvailable = parseInt(this.route.snapshot.params['quantityAvailable']);
    // this.route.params.subscribe(param => this.quantityAvailable = param['quantityAvailable']);
  }

  updateCart(qty: number) {
    this.productService.updateCart(this.productId, this.userName, qty).subscribe(
        data => {
          if(data) {
            alert("Product quantity updated successfully");
            this.router.navigate(['/viewcart']);
          } else {
            alert("Something went wrong")
            this.router.navigate(['/viewcart']);
          }
        },
        error => {
          this.router.navigate(['/viewcart']);
          console.log("Exception caught")
        },
        
    ()=> console.log("Update cart executed successfully")
    );
  }
}
