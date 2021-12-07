import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NomikalistComponent } from './nomikalist/nomikalist.component';

const routes: Routes = [
  {
    path:'',
    component : NomikalistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomikaRoutingModule { }
