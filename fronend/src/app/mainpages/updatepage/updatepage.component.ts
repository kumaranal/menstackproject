import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/servicefile/loginservice.service';

@Component({
  selector: 'app-updatepage',
  templateUrl: './updatepage.component.html',
  styleUrls: ['./updatepage.component.css']
})
export class UpdatepageComponent implements OnInit {

  getId: any;
  authtoken:any;
  updateForm!: FormGroup ;
  imagefile!: File;

  id:any;
  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:LoginserviceService,
    private activatedRoute:ActivatedRoute) {
    // this.getId=this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.getId);
    this.authtoken={
      authtoken: localStorage.getItem('token')
    }
    this.crudApi.myprofileapi(this.authtoken).subscribe(res=>{
      console.log("res",res);
      this.id=res._id;
      const emaildata=res['email']?res['email']:" ";
      const phone_nodata=res['phone_no']?res['phone_no']:" ";
      const passworddata=res['password']?res['password']:" ";
      const profile_imagedata=res['profile_image']?res['profile_image']:[];
      const namedata=res['name']?res['name']:" ";
      const dobdata=res['dob']?res['dob']:" ";


      this.updateForm.setValue({
        email:emaildata,
        phone_no:phone_nodata,
        password:passworddata,
        name:namedata,
        dob:dobdata,
        profile_image:"",
       
      })
    });
    this.updateForm=this.formBuilder.group({
      email:[''],
      phone_no:[''],
      password:[''],
      profile_image:[''],
      name:[''],
      dob:[''],
    })

    }


  ngOnInit(): void {
  }
  

  onUpdate(){
    console.log("hello");
    console.log("id",this.id);
    
    const formData=new FormData();
    formData.append('email',this.updateForm.value.email);
    formData.append('password',this.updateForm.value.password);
    formData.append('phone_no',this.updateForm.value.phone_no);
    formData.append('name',this.updateForm.value.name);
    formData.append('dob',this.updateForm.value.dob);
    formData.append('_id',this.id);
    if(this.imagefile){
      formData.append('profile_image',this.imagefile,this.imagefile.name);
    }

    // const datareg={...this.regForm.value,profile_image:this.file};
    // console.log("last",{...this.regForm.value,profile_image:this.file})
    console.log("formData",formData);
    this.crudApi.updateBook(this.id,formData).subscribe((res:any)=>{
      console.log("register data added successful");
      this.ngZone.run(()=>{
        this.router.navigate(['firstpage']);
      }),(err:any)=>{
        console.log(err);
      }
    })
  }
  getFile(event:any){
    if(event){
      this.imagefile= <File>event.target.files[0];

    }
    else{
      this.imagefile=<File>{};
    }
    console.log("file",this.imagefile);
  }

}
