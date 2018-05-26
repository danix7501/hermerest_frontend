import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {LoginModule} from './pages/login/login.module';
import {appRoutingProviders, routing} from './app.routing';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import {HttpUsingFormDataService} from './services/http/http.service';
import {HttpClientModule} from '@angular/common/http';
import {StudentsModule} from './pages/students/students.module';
import {DialogDeleteComponent} from './pages/dialog-delete/dialog-delete.component';
import {DialogDeleteModule} from './pages/dialog-delete/dialog-delete.module';
import {ToastrModule} from 'ngx-toastr';
import {DialogAddCourseModule} from './pages/dialog-add-course/dialog-add-course.module';
import {DialogAddCourseComponent} from './pages/dialog-add-course/dialog-add-course.component';
import { DialogAddStudentComponent } from './pages/dialog-add-student/dialog-add-student.component';
import {DialogAddStudentModule} from './pages/dialog-add-student/dialog-add-student.module';
import { DialogEditStudentComponent } from './pages/dialog-edit-student/dialog-edit-student.component';
import {DialogEditStudentModule} from './pages/dialog-edit-student/dialog-edit-student.module';
import {MatOptionModule, MatSelectModule} from '@angular/material';
import { DialogAssociatedParentsComponent } from './pages/dialog-associated-parents/dialog-associated-parents.component';
import {DialogAssociatedParentsModule} from './pages/dialog-associated-parents/dialog-associated-parents.module';
import {AllStudentsModule} from './pages/all-students/all-students.module';
import {CoreModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { DialogRegisterStudentComponent } from './pages/dialog-register-student/dialog-register-student.component';
import {DialogRegisterStudentModule} from "./pages/dialog-register-student/dialog-register-student.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    DashboardModule,
    StudentsModule,
    DialogDeleteModule,
    DialogAddCourseModule,
    DialogAddStudentModule,
    DialogEditStudentModule,
    DialogAssociatedParentsModule,
    DialogRegisterStudentModule,
    AllStudentsModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    routing,
  ],
  providers: [
    appRoutingProviders,
    HttpUsingFormDataService
  ],
  entryComponents: [
    DialogDeleteComponent,
    DialogAddCourseComponent,
    DialogAddStudentComponent,
    DialogEditStudentComponent,
    DialogAssociatedParentsComponent,
    DialogRegisterStudentComponent
  ],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }
