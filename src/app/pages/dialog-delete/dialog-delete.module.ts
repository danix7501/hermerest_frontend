import { NgModule } from '@angular/core';
import {DialogDeleteComponent} from './dialog-delete.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [DialogDeleteComponent],
  imports: [
    MatButtonModule,
    FlexLayoutModule,
    FlexModule,
  ]

})
export class DialogDeleteModule
{

}
