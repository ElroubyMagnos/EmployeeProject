import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticlesModule } from './particles/particles.module';
import { StatichomeModule } from './statichome/statichome.module';
import { baseurlInterceptor } from './baseurl.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    ParticlesModule,
    StatichomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [provideHttpClient(withInterceptors([baseurlInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
