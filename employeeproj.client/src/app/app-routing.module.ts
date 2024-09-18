import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { issigninGuard } from './statichome/guards/issignin.guard';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'inside', canActivate: [issigninGuard], loadChildren: () => import('./inside/inside.module').then(x => x.InsideModule) }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
