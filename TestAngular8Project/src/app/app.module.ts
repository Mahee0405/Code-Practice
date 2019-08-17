import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrimeModule } from './Prime/prime.module';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Nav/nav.component';
import { AuthService } from './_services/auth.service';
import { SharedModule } from './Shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error-interceptor.service';
import { AlertifyService } from './_services/alertify.service';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [AppComponent, NavComponent, RegisterComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    FormsModule,
    SharedModule
  ],
  providers: [AuthService, ErrorInterceptorProvider, AlertifyService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
