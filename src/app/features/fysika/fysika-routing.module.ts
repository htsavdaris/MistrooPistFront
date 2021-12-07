import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FysikalistComponent } from './fysikalist/fysikalist.component';

const routes: Routes = [
  {
    path:'',
    component : FysikalistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FysikaRoutingModule { }
