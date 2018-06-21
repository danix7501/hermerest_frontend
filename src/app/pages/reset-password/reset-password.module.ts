import { NgModule } from '@angular/core';

import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordComponent} from './reset-password.component';

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]

})
export class ResetPasswordModule { }
