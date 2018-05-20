import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoursesComponent} from '../courses/courses.component';
import {CdkTableModule} from '@angular/cdk/table';
import {StudentsComponent} from '../students/students.component';
import {ProfileStudentComponent} from '../profile-student/profile-student.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    DashboardComponent,
    CoursesComponent,
    StudentsComponent,
    ProfileStudentComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CdkTableModule,
    MatButtonModule,
    FlexLayoutModule,
    FlexModule,
    MatDialogModule,
  ]

})
export class DashboardModule { }
