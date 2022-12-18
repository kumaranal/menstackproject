import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse} from '@angular/common/http';
import { Book } from './book';
// import { Book } from './Book';
import { catchError, Observable ,throwError,map} from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  // auth-token:String;
  token:any;
  //node api link
  REST_API:string="http://localhost:9500/api";
  //set http header
  httpHeaders=new HttpHeaders().set('Content-Type','application/json')
  constructor(private httpClient:HttpClient) { 
  }

  
  headers=new HttpHeaders()
  .set('Content-Type','application/json')
  .set('Access-Control-Allow-Origin','*')
  // .set('auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJfaWQiOiI2Mzc5YzU5NWQ5ODRmMDJmZjAxMWU0NzUifSwiaWF0IjoxNjY4OTYwNDk2fQ.xCetWj4t76r_UewF-4OncsSEvTxGT27qjpa6VEbnXoU');
  // .set('Authorization','auth-token'+ this.token);
  //add records
  addBook(data:Book):Observable<any>{
    let API_URL=`${this.REST_API}/add-profile`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
  }

  //get all record
  getAllBook(){
    return this.httpClient.get(`${this.REST_API}`,{});
  }

  //get single book 
  getBook(id:any):Observable<any>{
    let API_URL=`${this.REST_API}/find-profile/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
     return res||{}
    }) ,
    catchError(this.handleEroor)
    )
  }
  //update bokk
  updateBook(id:any,data:any):Observable<any>{
    console.log("data update",data);
    let API_URL=`${this.REST_API}/update-profile/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(
    catchError(this.handleEroor)
    )
  }

  //delete book
  deleteBook(id:any):Observable<any>{
    let API_URL=`${this.REST_API}/delete-profile/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(
    catchError(this.handleEroor)
    )
  }

  //registration Book
  registration(data:any):Observable<any>{
    let API_URL=`${this.REST_API}/registration-user`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
  }

  //login Book
  login(data:Book):Observable<any>{
    let API_URL=`${this.REST_API}/login-user`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
  }
  //myprofile Book
  myprofileapi(data:any):Observable<any>{
    let API_URL=`${this.REST_API}/find-profile1`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleEroor))
  }

  //error handel
  handleEroor(error:HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      //handel client error
      errorMessage=error.error.message;
    }else{
      //server error
      errorMessage=`Error Code: ${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {     
      return errorMessage;
    });
  }



  getLoginCred(){
    var data = localStorage.getItem('token');
    console.log("data",data);
    if (data != null && data != '' && data != undefined) {
      console.log("msin ",JSON.parse(window.atob(data.split('.')[1])));
      return data;
    }
    else {
      return null;
    }
  }

}
