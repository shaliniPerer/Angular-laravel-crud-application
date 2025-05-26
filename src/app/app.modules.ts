import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module'; 
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,        
    AppRoutingModule     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
