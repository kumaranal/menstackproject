import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/servicefile/loginservice.service';
import{ MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {
  regForm: FormGroup ;
  imagefile!: File;
  saveformflag :any= false;

  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:LoginserviceService) {
  this.regForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    phone_no:['',[Validators.required,Validators.minLength(10)]],
    profile_image:['',[Validators.required]],
    name:['',[Validators.required]],
    dob:['',[Validators.required]],

  })
}
  ngOnInit(): void {
  }
  onSubmit(){
    if(! this.regForm.valid){
      this.saveformflag=true
      alert("register data invalid");

      return;
    }
    const formData=new FormData();
    formData.append('email',this.regForm.value.email);
    formData.append('password',this.regForm.value.password);
    formData.append('phone_no',this.regForm.value.phone_no);
    formData.append('profile_image',this.imagefile,this.imagefile.name);
    formData.append('name',this.regForm.value.name);
    formData.append('dob',this.regForm.value.dob);
    
    // const datareg={...this.regForm.value,profile_image:this.file};
    // console.log("last",{...this.regForm.value,profile_image:this.file})
    console.log("formData",formData);
    this.crudApi.registration(formData).subscribe((res:any)=>{
      console.log("register data added successful");
      alert("register data added successful");
      this.ngZone.run(()=>{
        this.router.navigate(['login']);
      }),(err:any)=>{
        alert("register data already existed");
        console.log(err);
      }
    })
  }
  getFile(event:any){
    this.imagefile= <File>event.target.files[0];
    console.log("file",this.imagefile);
  }

  login(){
    console.log("login");
    this.ngZone.run(()=>{
      this.router.navigateByUrl(`login`);
    })
  }
}
