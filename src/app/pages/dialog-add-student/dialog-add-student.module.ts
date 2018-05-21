import { NgModule } from '@angular/core';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogAddStudentComponent} from './dialog-add-student.component';

@NgModule({
  declarations: [DialogAddStudentComponent],
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
export class DialogAddStudentModule
{

}
