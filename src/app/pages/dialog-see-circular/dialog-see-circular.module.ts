import { NgModule } from '@angular/core';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DialogSeeCircularComponent} from './dialog-see-circular.component';

@NgModule({
  declarations: [DialogSeeCircularComponent],
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
export class DialogSeeCircularModule
{

}
