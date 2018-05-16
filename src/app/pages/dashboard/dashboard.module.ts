import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoursesComponent} from '../courses/courses.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CoursesComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule
  ]

})
export class DashboardModule { }
