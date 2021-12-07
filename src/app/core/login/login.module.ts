import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgprimeModule } from 'src/app/ngprime.module';
// import { MessageModule } from 'primeng/message';
// import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgprimeModule,    
  ]
})
export class LoginModule { }
