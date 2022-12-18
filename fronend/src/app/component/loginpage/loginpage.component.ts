import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/servicefile/loginservice.service';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  // constructor() { }
  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:LoginserviceService) {
    this.loginForm=this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  ngOnInit(): void {
  }
  
  onSubmit(){
    if(! this.loginForm.valid){
      return;
    }
    console.log("submit");

    this.crudApi.login(this.loginForm.value).subscribe((res:any)=>{
      if((res.msg.toLowerCase())=="success")
      {
        localStorage.setItem('token',res.token);
        // alert(res.msg);

        this.ngZone.run(()=>{
        this.router.navigate(['firstpage']);

      
      }),(err:any)=>{
        alert("credential not right");
        console.log(err);
      }}
      else{
        alert("credential not right");
        console.log(" credential not right");

      }
    })
  }
  register(){
    console.log("register");
    this.ngZone.run(()=>{
      this.router.navigateByUrl(`register`);
    })
  }

}
