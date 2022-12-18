import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './component/loginpage/loginpage.component';
import { RegisterpageComponent } from './component/registerpage/registerpage.component';
import { MyprofilepageComponent } from './mainpages/myprofilepage/myprofilepage.component';
import { AllprofilepageComponent } from './mainpages/allprofilepage/allprofilepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirstpageComponent } from './mainpages/firstpage/firstpage.component';
import { UpdatepageComponent } from './mainpages/updatepage/updatepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MaterialExampleModule} from '../material.module';
import {MatNativeDateModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table' ;
import{MatPaginatorModule} from '@angular/material/paginator'
import{MatPaginator} from '@angular/material/paginator';
import{MatSortModule} from '@angular/material/sort'
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    RegisterpageComponent,
    MyprofilepageComponent,
    AllprofilepageComponent,
    FirstpageComponent,
    UpdatepageComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
    // MaterialExampleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
