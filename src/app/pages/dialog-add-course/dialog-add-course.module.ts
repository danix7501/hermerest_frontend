import { NgModule } from '@angular/core';
import {DialogAddCourseComponent} from './dialog-add-course.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [DialogAddCourseComponent],
  imports: [
    MatButtonModule,
    FlexLayoutModule,
    FlexModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    BrowserModule,
    CommonModule,
  ]

})
export class DialogAddCourseModule
{

}
