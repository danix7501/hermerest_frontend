import { NgModule } from '@angular/core';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DialogSeeAuthorizationComponent} from './dialog-see-authorization.component';

@NgModule({
  declarations: [DialogSeeAuthorizationComponent],
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
export class DialogSeeAuthorizationModule
{

}
