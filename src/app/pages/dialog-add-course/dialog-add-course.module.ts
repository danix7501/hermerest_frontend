import { NgModule } from '@angular/core';
import {DialogAddCourseComponent} from './dialog-add-course.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  ]

})
export class DialogAddCourseModule
{

}
