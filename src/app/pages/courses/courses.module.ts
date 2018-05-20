import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    CdkTableModule,
  ]
})
export class CoursesModule { }
