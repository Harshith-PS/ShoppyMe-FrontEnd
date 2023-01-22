import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewPurchaseDetailsComponent } from './view-purchase-details/view-purchase-details.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './ShoppyMe-Services/auth-Service/auth-guard.service';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { UpdateCartComponent } from './update-cart/update-cart.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'viewproduct', component: ViewProductComponent },
    { path: 'login', component : LoginComponent},
    { path: 'viewcart', component : ViewCartComponent, canActivate: [AuthGuardService]},
    {path: 'purchaseDetails', component : ViewPurchaseDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'register', component : RegisterComponent},
    {path: 'rating/:productId/:productName', component : AddRatingComponent},
    { path: 'updateCart/:productId/:productName/:quantity/:quantityAvailable', component: UpdateCartComponent },
    { path: '**', component: HomeComponent }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
