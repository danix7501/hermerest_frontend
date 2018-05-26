import { NgModule } from '@angular/core';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DialogRegisterStudentComponent} from './dialog-register-student.component';

@NgModule({
  declarations: [DialogRegisterStudentComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    FlexLayoutModule,
    FlexModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule
  ]

})
export class DialogRegisterStudentModule
{

}
