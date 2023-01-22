import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { ViewPurchaseDetailsComponent } from './view-purchase-details/view-purchase-details.component'
import { HomeComponent } from './home/home.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { routing } from './app.routing';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { UpdateCartComponent } from './update-cart/update-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductComponent,
    LoginComponent,
    RegisterComponent,
    FeedBackComponent,
    CommonLayoutComponent,
    ViewPurchaseDetailsComponent,
    HomeComponent,
    ViewCartComponent,CustomerLayoutComponent, AddRatingComponent, UpdateCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule, HttpClientModule, routing 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
