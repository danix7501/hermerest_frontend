import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    NgbModule.forRoot()
  ]

})
export class DashboardModule { }
