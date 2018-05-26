import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MatDialog} from '@angular/material';
import {DialogEditStudentComponent} from '../dialog-edit-student/dialog-edit-student.component';
import {DialogAssociatedParentsComponent} from '../dialog-associated-parents/dialog-associated-parents.component';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  nameStudent: any;
  surnameStudent: any;
  courseStudent: any;
  idCentre: any;
  idCourse: any;

  parents: any[] = [];

  @Input() idStudent: any;
  @Input() backView: any;
  @Output('update') change = new EventEmitter();


  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getStundent();
    this.getParentStudent();
  }

  getStundent() {
    this.http.get('/students/' +  this.idStudent).subscribe((resp: any) => {
      this.nameStudent = resp.content.name;
      this.surnameStudent = resp.content.surname;
      this.courseStudent = resp.content.course.name;
      this.idCentre = resp.content.course.centre.id;
      this.idCourse = resp.content.course.id;
    });
  }

  getParentStudent() {
    this.http.get('/students/' +  this.idStudent + '/parents').subscribe((resp: any) => {
      if (resp.content) {
        this.parents = [];
        for (let i = 0; i < resp.content.parents.length; i++) {
          this.parents.push(resp.content.parents[i]);
        }
      }
    });
  }

  editStudent() {
    this.dialog.open(DialogEditStudentComponent, {
      data: {
        nameStudent: this.nameStudent,
        surnameStudent: this.surnameStudent,
        idStudent: this.idStudent,
        idCentre: this.idCentre,
        idCourse: this.idCourse
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp !== 'cancel') {
        this.nameStudent = resp.name;
        this.surnameStudent = resp.surname;
        this.courseStudent = resp.course.name;
      }
    });
  }

  asociatedParents() {
    this.dialog.open(DialogAssociatedParentsComponent, {
      data: {
        idCentre: this.idCentre,
        idStudent: this.idStudent
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp !== 'cancel') {
        this.parents = resp.parents;
      }

    });
  }

  back() {
    this.change.emit(this.backView);
  }

}
