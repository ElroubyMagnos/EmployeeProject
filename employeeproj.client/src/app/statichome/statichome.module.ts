import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesigninComponent } from './homesignin/homesignin.component';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { ParticlesModule } from "../particles/particles.module";
import { SignedInHomeComponent } from './signed-in-home/signed-in-home.component';
import { signinGuard } from './guards/signin.guard';
import { issigninGuard } from './guards/issignin.guard';



@NgModule({
  declarations: [
    HomesigninComponent,
    SigninComponent,
    SignedInHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomesigninComponent, canActivate: [signinGuard] },
        { path: 'signin', component: SigninComponent, canActivate: [signinGuard] },
        { path: 'signedinhome', component: SignedInHomeComponent, canActivate: [issigninGuard] }
    ]),
    FormsModule,
    ParticlesModule
]
})
export class StatichomeModule { }
