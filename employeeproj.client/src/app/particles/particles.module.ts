import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { BellnotifyComponent } from './bellnotify/bellnotify.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BufferingComponent } from './buffering/buffering.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigatorComponent,
    BellnotifyComponent,
    BufferingComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigatorComponent,
    BellnotifyComponent,
    BufferingComponent
  ]
})
export class ParticlesModule { }
