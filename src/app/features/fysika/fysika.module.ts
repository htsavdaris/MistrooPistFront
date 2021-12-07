import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FysikaRoutingModule } from './fysika-routing.module';
import { FysikalistComponent } from './fysikalist/fysikalist.component';
import { NgprimeModule } from 'src/app/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [
    FysikalistComponent
  ],
  imports: [
    CommonModule,
    NgprimeModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    FysikaRoutingModule
  ]
})
export class FysikaModule { }
