import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NomikaRoutingModule } from './nomika-routing.module';
import { NomikalistComponent } from './nomikalist/nomikalist.component';
import { NgprimeModule } from 'src/app/ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    NomikalistComponent
  ],
  imports: [
    CommonModule,
    NgprimeModule,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    NomikaRoutingModule
  ]
})
export class NomikaModule { }
