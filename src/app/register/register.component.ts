import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../ShoppyMe-Services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  msg: string = '';
  shwMsg: boolean=false;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.minLength(12)]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      dateOfbirth: ['', [Validators.required,checkDate]],
      address: ['', Validators.required]
    });
  }

  // SubmitForm(form: FormGroup) {
  //   console.log(form.value.emailId, form.value.password, form.value.gender,
  //     form.value.dateOfbirth, form.value.address);

  //   if (this.registerForm.valid) {
  //     this.msg = "Signup Successful"
  //   }
  //   else {
  //     this.msg = "Try again Later"
  //   }
  // }

  SubmitForm(form: FormGroup) {
      this.userService.addNewCustomer(form.value.emailId, form.value.password, form.value.gender,
        form.value.dateOfbirth, form.value.address).subscribe(
          data => {
            if(data){
              alert('Registered Succsessfully');
              this.router.navigate(['/login']);
            }
            else{
              alert('User already registered') ;
              this.router.navigate(['/login']);
          }
          },
          responseLoginError => {
            this.msg = 'Something went wrong';
            this.shwMsg=true;
            console.log(this.msg);
          },
          () => console.log("Registration method excuted successfully")
        );
      }
}
function checkDate(control: FormControl) {
  var currentDate = new Date();
  var givenDate = new Date(control.value)
  console.log(currentDate);
  console.log(givenDate);
  if (givenDate <= currentDate || givenDate == null) {
    return null
  }
  else {
    return {
      dateError: {
        message: "Enter a date less than today's date"
      }
    };
  }
}
