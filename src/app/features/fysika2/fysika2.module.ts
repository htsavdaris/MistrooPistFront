import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fysika2RoutingModule } from './fysika2-routing.module';
import { Fysikalist2Component } from './fysikalist2/fysikalist2.component';
import { NgprimeModule } from 'src/app/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    Fysikalist2Component
  ],
  imports: [
    CommonModule,
    NgprimeModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    Fysika2RoutingModule
  ]
})
export class Fysika2Module { }
