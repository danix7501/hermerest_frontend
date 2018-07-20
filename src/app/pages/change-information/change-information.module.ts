import { NgModule } from '@angular/core';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule, MatTreeModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ChangeInformationComponent} from './change-information.component';

@NgModule({
  declarations: [ChangeInformationComponent],
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
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTreeModule,
    MatCheckboxModule
  ]

})
export class ChangeInformationModule
{

}
