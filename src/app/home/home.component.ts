import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent  {
  imageSrc: string
  role:any;
  customerLayout: boolean = false;
  commonLayout: boolean = false;

  constructor() {
    this.imageSrc ='src/app/quickKart-images/quickKart.png';
    this.role= sessionStorage.getItem('userRole')
    if (this.role == "2") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  }
  
}
