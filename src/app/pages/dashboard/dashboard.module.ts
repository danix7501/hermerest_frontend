import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatOptionModule,
  MatPaginatorModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatStepperModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoursesComponent} from '../courses/courses.component';
import {CdkTableModule} from '@angular/cdk/table';
import {StudentsComponent} from '../students/students.component';
import {ProfileStudentComponent} from '../profile-student/profile-student.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {AllStudentsComponent} from '../all-students/all-students.component';
import {FormsModule} from '@angular/forms';
import {AuthorizationsComponent} from '../authorizations/authorizations.component';
import {CircularsComponent} from '../circulars/circulars.component';
import {PollsComponent} from '../polls/polls.component';
import {TeachersComponent} from '../teachers/teachers.component';
import {UpdateCourseComponent} from '../update-course/update-course.component';
import {Ng2DragDropModule} from 'ng2-drag-drop';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    CoursesComponent,
    StudentsComponent,
    TeachersComponent,
    ProfileStudentComponent,
    AllStudentsComponent,
    AuthorizationsComponent,
    CircularsComponent,
    PollsComponent,
    UpdateCourseComponent
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
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatStepperModule,
    Ng2DragDropModule,
    BrowserModule,
    CommonModule
  ]

})
export class DashboardModule { }
