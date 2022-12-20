import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/servicefile/loginservice.service';
import { MatTableModule } from '@angular/material/table' ; 
import{MatTableDataSource}from '@angular/material/table';
import{MatPaginator} from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort';
import { switchAll } from 'rxjs';


export interface PeriodicElement {
  email: string;
  name: number;
  phone_no: number;
  profile_image: string;
}
@Component({
  selector: 'app-myprofilepage',
  templateUrl: './myprofilepage.component.html',
  styleUrls: ['./myprofilepage.component.css']
})
export class MyprofilepageComponent implements OnInit {
  books:any=[];
  authtoken:any;
  displayedColumns: string[] = ['name'];
  dataSource=new MatTableDataSource<PeriodicElement>;
  data:any=[]
  @ViewChild('Paginator')paginator:any=MatPaginator;
  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:LoginserviceService) { 
    this.authtoken={
      authtoken: localStorage.getItem('token')
    }
  }

  ngOnInit(): void {
    this.crudApi.myprofileapi(this.authtoken).subscribe(res=>{
      console.log(res);
      if(res.error){
        this.ngZone.run(()=>{
          this.router.navigateByUrl(`login`)
        })
      }
      if(res){
        this.books=res;
        this.dataSource=new MatTableDataSource(this.data)


      }else{
        this.ngZone.run(()=>{
          this.router.navigateByUrl(`login`)
        })
      }
    })
  }

  delete() {
    var txt;
    if (confirm("THE PROFILE WILL PERMANENTLY DELETED")) {
      // console.log("delete");
      this.deleteprofile(this.books._id,1);
    } else {
      return
    }
  }
  deleteprofile(id:any,i:any){
    this.crudApi.deleteBook(id).subscribe(res=>{
      // this.books.splice(i,1);
    })
    this.ngZone.run(()=>{
      this.router.navigateByUrl(`login`)
    })
  }
  edit(){
    this.ngZone.run(()=>{
      this.router.navigateByUrl(`firstpage/updateMyprofile`)
    })
  }





  
}