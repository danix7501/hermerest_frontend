import { NgModule } from '@angular/core';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogEditStudentComponent} from './dialog-edit-student.component';

@NgModule({
  declarations: [DialogEditStudentComponent],
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
export class DialogEditStudentModule
{

}
