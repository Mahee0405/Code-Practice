import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
 
})
export class SharedModule { }
