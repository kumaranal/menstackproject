import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/servicefile/loginservice.service';
// import {MatTableModule} from '@angular/material/table';
import { MatTableModule } from '@angular/material/table' ; 
import{MatTableDataSource}from '@angular/material/table';
import{MatPaginator} from '@angular/material/paginator';
import{MatSort} from '@angular/material/sort';
// import{PeriodicElement} from './Interface/PeriodicElement';
import {MatFormField} from '@angular/material/form-field'; 
import {MatInput} from '@angular/material/input'; 

export interface PeriodicElement {
  email: string;
  name: number;
  phone_no: number;
  profile_image: string;
}
// let ELEMENT_DATA: PeriodicElement[];
@Component({
  selector: 'app-allprofilepage',
  templateUrl: './allprofilepage.component.html',
  styleUrls: ['./allprofilepage.component.css']
})
export class AllprofilepageComponent implements OnInit {
  books:any=[];
  displayedColumns: string[] = ['email', 'name', 'phone_no', 'profile_image'];
  dataSource=new MatTableDataSource<PeriodicElement>;
  data:any=[]
  @ViewChild('Paginator')paginator:any=MatPaginator;
  // @ViewChild(MatSort)sort:any=MatSort;
  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:LoginserviceService) { }

  ngOnInit(): void {
    this.crudApi.getAllBook().subscribe(res=>{
      console.log(res);
      this.data=res;
      this.dataSource=new MatTableDataSource(this.data)

      // this.dataSource.sort=this.sort;

      this.dataSource.paginator=this.paginator;
    })
  }
  ngAfterViewInit(){
    // this.dataSource=new MatTableDataSource(this.data)
    // this.dataSource.paginator=this.paginator;

  }
  delete(id:any,i:any){
    this.crudApi.deleteBook(id).subscribe(res=>{
      this.books.splice(i,1);
    })
  }
  edit(id:any){
    this.ngZone.run(()=>{
      this.router.navigateByUrl(`firstpage/editbook/${id}`)
    })
  }

  applyFilter(event:Event){
    let filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }
}
