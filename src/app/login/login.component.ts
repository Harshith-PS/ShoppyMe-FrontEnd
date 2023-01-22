import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../ShoppyMe-Services/product-service/product.service';
import { UserService } from '../ShoppyMe-Services/user-service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //  submitLoginForm(form: NgForm) {
  //   console.log(form.value.email);
  //   console.log(form.value.password);
  //}

  msg : string='';
  shwMsg :Boolean=false;

  ngOnInit(){
    //this.submit();
  }

  constructor( private userService :UserService,  private router: Router) { }

  submitLoginForm(form: NgForm) {
    this.userService.validateCredentials(form.value.email,form.value.password).subscribe(
      data => {
        console.log(data);
        const jsonString = JSON.stringify(data);
        const Jsonobj = JSON.parse(jsonString);
        if(Jsonobj.status==true){
          sessionStorage.setItem('userName', form.value.email)
          sessionStorage.setItem('userRole', Jsonobj.role)
          this.router.navigate(['/home']);
          
            this.msg='Login Successfull';
            this.shwMsg=false;
        }
        else{
          this.msg='Login failed';
          this.shwMsg=true;
      }
      },
      responseLoginError => {
        this.msg = 'Register please';
        this.shwMsg=true;
        console.log(this.msg);
      },
      () => console.log("submitLoginForm method excuted successfully")
    );
  }

}
