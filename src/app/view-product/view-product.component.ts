import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ICategory } from '../ShoppyMe-Interfaces/category';
import { IProduct } from '../ShoppyMe-Interfaces/product';
import { ProductService } from '../ShoppyMe-Services/product-service/product.service';
import { UserService } from '../ShoppyMe-Services/user-service/user.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  products : IProduct[]=[];
  categories : ICategory[]=[];
  showMsgDiv: boolean = false;
  filteredProducts : IProduct[]=[];
  searchByCategoryId :string='0';
  searchByProductName : string='';
  searchProducts: IProduct[] = [];
  imageScr : String="";
  errMsg: string= "";
  userRole: any;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  userName : any;

constructor( private productService :ProductService, private userService : UserService, private router : Router) {
  this.userRole = sessionStorage.getItem('userRole');
  this.userName = sessionStorage.getItem('userName');
    if (this.userRole == "2") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
 }
  ngOnInit() {
   
    if (this.products.length== 0)
    {
      this.showMsgDiv = true;
    }
    this.filteredProducts = this.products;

    this.searchProducts = this.filteredProducts;

    this.imageScr="../../assets/cart.jpg";

    this.getProducts();
    this.getProductCategories();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
        this.filteredProducts = data
        this.showMsgDiv=false
      },
      responseProductError => {
        this.products = [];
        this.errMsg = responseProductError;
        console.log(this.errMsg);
      },
      () => console.log("GetProducts method excuted successfully")
    );
  }

  getProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.categories = data
      },
      responseCategoryError => {
        this.categories = [];
        this.errMsg = responseCategoryError;
        console.log(this.errMsg);
      },
      () => console.log("GetCategories method excuted successfully")
    );
  }
  
  searchProduct(productName: string) {
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
     
      this.filteredProducts = this.products.filter(prod => prod.categoryDTO.categoryId.toString() == this.searchByCategoryId);
    }
    if (productName != null || productName == "") {
      this.searchByProductName = productName;
      this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
    }
    if (this.filteredProducts.length == 0) {
      this.showMsgDiv = true;
    }
    else {
      this.showMsgDiv = false;
    }
  }
  searchProductByCategory(categoryId: string) {
    if (this.searchByProductName != null || this.searchByProductName == "") {
      this.filteredProducts = this.products.filter(prod => prod.productName.toLowerCase().indexOf(this.searchByProductName.toLowerCase()) >= 0);
    }
    else {
      this.filteredProducts = this.products;
    }
    this.searchByCategoryId = categoryId;
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryDTO.categoryId.toString() == this.searchByCategoryId);
    }
  }
  addToCart(prod: IProduct) {
    if (this.userRole == null) {
      this.router.navigate(['/login']);
    }
    else {

      this.userService.addProductToCart(prod.productId, this.userName)
        .subscribe(
          responseProductData => {
            //this.message = responseProductData;
            if (responseProductData) {
              alert("Product added sucessfully.")
              this.getProducts();
            }
          },
          responseProductError => {
            this.errMsg = responseProductError,
              console.log(this.errMsg),
              alert("Sorry, something went wrong. Please try again after sometime.")
          },
          () => console.log("AddToCart method executed successfully")
        );
        }
      }
}
