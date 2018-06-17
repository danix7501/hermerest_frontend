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
import {MatAutocompleteModule, MatOptionModule, MatSelectModule} from '@angular/material';
import { DialogAssociatedParentsComponent } from './pages/dialog-associated-parents/dialog-associated-parents.component';
import {DialogAssociatedParentsModule} from './pages/dialog-associated-parents/dialog-associated-parents.module';
import {AllStudentsModule} from './pages/all-students/all-students.module';
import {FormsModule} from '@angular/forms';
import { DialogRegisterStudentComponent } from './pages/dialog-register-student/dialog-register-student.component';
import {DialogRegisterStudentModule} from './pages/dialog-register-student/dialog-register-student.module';
import {AuthorizationsModule} from './pages/authorizations/authorizations.module';
import {DialogAddAuthorizationModule} from './pages/dialog-add-authorization/dialog-add-authorization.module';
import {DialogAddAuthorizationComponent} from './pages/dialog-add-authorization/dialog-add-authorization.component';
import {CircularsModule} from './pages/circulars/circulars.module';
import {PollsModule} from './pages/polls/polls.module';
import { DialogAddCircularComponent } from './pages/dialog-add-circular/dialog-add-circular.component';
import {DialogAddCircularModule} from './pages/dialog-add-circular/dialog-add-circular.module';
import {DialogAddPollComponent} from './pages/dialog-add-poll/dialog-add-poll.component';
import {DialogAddPollModule} from './pages/dialog-add-poll/dialog-add-poll.module';
import { DialogSeeAuthorizationComponent } from './pages/dialog-see-authorization/dialog-see-authorization.component';
import {DialogSeeAuthorizationModule} from './pages/dialog-see-authorization/dialog-see-authorization.module';
import { DialogSeeCircularComponent } from './pages/dialog-see-circular/dialog-see-circular.component';
import {DialogSeeCircularModule} from './pages/dialog-see-circular/dialog-see-circular.module';
import { DialogSeePollComponent } from './pages/dialog-see-poll/dialog-see-poll.component';
import {DialogSeePollModule} from './pages/dialog-see-poll/dialog-see-poll.module';
import {TeachersModule} from './pages/teachers/teachers.module';
import { DialogRegisterTeacherComponent } from './pages/dialog-register-teacher/dialog-register-teacher.component';
import {DialogRegisterTeacherModule} from './pages/dialog-register-teacher/dialog-register-teacher.module';
import { DialogSeeTeacherComponent } from './pages/dialog-see-teacher/dialog-see-teacher.component';
import {DialogSeeTeacherModule} from './pages/dialog-see-teacher/dialog-see-teacher.module';
import { DialogEditLimitdateComponent } from './pages/dialog-edit-limitdate/dialog-edit-limitdate.component';
import {DialogEditLimitdateModule} from './pages/dialog-edit-limitdate/dialog-edit-limitdate.module';

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
    TeachersModule,
    DialogDeleteModule,
    DialogAddCourseModule,
    DialogAddStudentModule,
    DialogEditStudentModule,
    DialogAssociatedParentsModule,
    DialogRegisterStudentModule,
    DialogRegisterTeacherModule,
    DialogAddAuthorizationModule,
    DialogAddCircularModule,
    DialogAddPollModule,
    DialogSeeAuthorizationModule,
    DialogSeeCircularModule,
    DialogSeePollModule,
    DialogSeeTeacherModule,
    DialogEditLimitdateModule,
    AllStudentsModule,
    AuthorizationsModule,
    CircularsModule,
    PollsModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
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
    DialogRegisterStudentComponent,
    DialogRegisterTeacherComponent,
    DialogAddAuthorizationComponent,
    DialogAddCircularComponent,
    DialogAddPollComponent,
    DialogSeeAuthorizationComponent,
    DialogSeeCircularComponent,
    DialogSeePollComponent,
    DialogSeeTeacherComponent,
    DialogEditLimitdateComponent
  ],
  bootstrap: [AppComponent],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppModule { }
