import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fysikalist2Component } from './fysikalist2/fysikalist2.component';

const routes: Routes = [
  {
    path:'',
    component : Fysikalist2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fysika2RoutingModule { }
