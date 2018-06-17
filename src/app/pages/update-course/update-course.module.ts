import { NgModule } from '@angular/core';

import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2DragDropModule} from 'ng2-drag-drop';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    Ng2DragDropModule,
    CommonModule
  ]

})
export class UpdateCourseModule
{

}
