import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginpageComponent } from './component/loginpage/loginpage.component';
import { RegisterpageComponent } from './component/registerpage/registerpage.component';
import { MyprofilepageComponent } from './mainpages/myprofilepage/myprofilepage.component';
import { AllprofilepageComponent } from './mainpages/allprofilepage/allprofilepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirstpageComponent } from './mainpages/firstpage/firstpage.component';
import { AuthgaurdGuard } from './authgaurd.guard';
import { UpdatepageComponent } from './mainpages/updatepage/updatepage.component';
const routes: Routes = [

  { path: 'login', component: LoginpageComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'firstpage',canActivate:[AuthgaurdGuard], component: FirstpageComponent ,
      children: [
        { path: 'allprofile', component: AllprofilepageComponent },
        { path: 'myprofile', component: MyprofilepageComponent },
        { path: 'updateMyprofile', component: UpdatepageComponent}
      ]
    
  },
  { path: '',   redirectTo: 'home', pathMatch: 'full'}, // redirect to `first-component`
  { path: '**', component: LoginpageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
