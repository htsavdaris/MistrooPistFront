import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('src/app/core/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'changepass',
    loadChildren: () => import('src/app/core/changepass/changepass.module').then(m => m.ChangepassModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'fysika',
      //   loadChildren: () => import('src/app/features/fysika/fysika.module').then(m => m.FysikaModule)
      // },
      {
        path: 'fysika',
        loadChildren: () => import('src/app/features/fysika2/fysika2.module').then(m => m.Fysika2Module)
      },
      {
        path: 'nomika',
        loadChildren: () => import('src/app/features/nomika/nomika.module').then(m => m.NomikaModule)
      },
      {
        path: 'home',
        loadChildren: () => import('src/app/features/home/home.module').then(m => m.HomeModule)
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
