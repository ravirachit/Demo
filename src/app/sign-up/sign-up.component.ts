import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { rejexvld } from 'src/app/errormssg-validators/rejex';
import{errorMssg} from 'src/app/errormssg-validators/error-mssg';
  

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

signUpForm:FormGroup;
invalidForm:boolean;
errorMssg=errorMssg;
matchPassword:boolean;
passwordErrorMssg:string;
singUpValue:any=[];
signUpObj:any=[];

 
  constructor(public FormBuilder:FormBuilder,private router:Router ) { }

  ngOnInit() {
    this.signUpForm=this.FormBuilder.group({
      name:['',Validators.compose([Validators.required,Validators.pattern(rejexvld.fullName)])],
      email:['',Validators.compose([Validators.required,Validators.pattern(rejexvld.email)])],
      phone:['',Validators.pattern(rejexvld.phone)],
      password:['',Validators.compose([Validators.required,Validators.pattern(rejexvld.password)])],
      cPassword:['',Validators.required]

    })
    this.singUpValue = (JSON.parse(localStorage.getItem("signUpData")) || []);
  }
  onSubmit(){
    this.invalidForm = true;
    if(this.signUpForm.invalid ){
      return;
    }else if(this.signUpForm.value.password != this.signUpForm.value.cPassword){
      this.matchPassword=true
      this.passwordErrorMssg="Password doesn't match"
      return;
    }else{
      this.invalidForm= false;
    }
console.log(this.signUpForm.value);
this.signUpObj=this.signUpForm.value;
this.singUpValue.push(this.signUpObj);
localStorage.setItem('signUpData',JSON.stringify(this.singUpValue));
this.router.navigate(['/']);
  }
  
}