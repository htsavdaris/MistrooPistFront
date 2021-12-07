import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomikaRoutingModule } from './nomika-routing.module';
import { NomikalistComponent } from './nomikalist/nomikalist.component';
import { NgprimeModule } from 'src/app/ngprime.module';

@NgModule({
  declarations: [
    NomikalistComponent
  ],
  imports: [
    CommonModule,
    NgprimeModule,
    NomikaRoutingModule
  ]
})
export class NomikaModule { }
