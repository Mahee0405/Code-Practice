import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [

  ],
  exports: [
    MenubarModule, ButtonModule, InputTextModule,PasswordModule
  ]
})
export class PrimeModule { }
