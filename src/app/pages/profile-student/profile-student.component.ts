import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MatDialog} from '@angular/material';
import {DialogEditStudentComponent} from '../dialog-edit-student/dialog-edit-student.component';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  nameStudent: any;
  surnameStudent: any;
  courseStudent: any;

  parents: any[] = [];

  @Input() idStudent: any;
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
    });
  }

  getParentStudent() {
    this.http.get('/students/' +  this.idStudent + '/parents').subscribe((resp: any) => {
      if (resp.content) {
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
        idStudent: this.idStudent
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

  }

  back() {
    this.change.emit(2);
  }

}
