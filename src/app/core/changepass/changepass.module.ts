import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgprimeModule } from 'src/app/ngprime.module';
import { ChangepassRoutingModule } from './changepass-routing.module';
import { ChangepassComponent } from './changepass.component';


@NgModule({
  declarations: [
    ChangepassComponent
  ],
  imports: [
    CommonModule,
    ChangepassRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgprimeModule, 
  ]
})
export class ChangepassModule { }
