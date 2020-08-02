import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  isInvalidForm:boolean;
  logedIn:any={};
  signUpObj:any=[]

  constructor(private router:Router,public FormBuilder:FormBuilder) { }

  ngOnInit() {
    this.logInForm=this.FormBuilder.group({
      phone:['',Validators.required],
      password:['',Validators.required]
    })
    this.logedIn=(JSON.parse(localStorage.getItem('signUpData')))
  }
 onSubmit(){
   this.isInvalidForm=true;
   let phone = this.logInForm.value.phone;
   let pass= this.logInForm.value.password;
   this.signUpObj=(this.logedIn.filter(item =>{
     return item.phone == phone && item.password == pass;
   }))
   if(this.logInForm.invalid){
     return;
   }else{
     this.isInvalidForm= false;
   }
    this.router.navigate(['dashboard']);
  }
}
