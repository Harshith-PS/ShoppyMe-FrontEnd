import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent {

  feedBackForm!: FormGroup;
  msg : string='';

  constructor(private formBuilder : FormBuilder){}

  ngOnInit(){
    this.feedBackForm=this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern('[a-zA-Z-_0-9]+@gmail.com')]],
      feedback:['',[Validators.maxLength(100), Validators.required, Validators.minLength(10)]]
    })
  }

  submitForm(form:FormGroup){
    if(this.feedBackForm.valid){
      this.msg= "FeedBack submitted successfully"
    }
    else{
      this.msg= "Please try again later!"
    }
  }

  }
