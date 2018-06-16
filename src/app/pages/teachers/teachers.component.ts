import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {DialogRegisterTeacherComponent} from '../dialog-register-teacher/dialog-register-teacher.component';
import {DialogSeeTeacherComponent} from '../dialog-see-teacher/dialog-see-teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers: any[] = [];
  idAdministrator: any;
  idCentre: any;

  displayedColumns = ['name', 'course', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.idAdministrator = new JwtHelper().decodeToken(localStorage.getItem('token')).id;
    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      this.idCentre = resp.content.centre.id;
      this.getTeachersOfCentre(this.idCentre);
    });
  }

  getTeachersOfCentre(idCentre) {
    this.http.get('/centres/' + idCentre + '/teachers').subscribe((resp: any) => {
      if (resp.content) {
        this.teachers = resp.content.teachers;
        this.dataSource = new MatTableDataSource(this.teachers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });
  }

  addTeacher() {
    this.dialog.open(DialogRegisterTeacherComponent, {
      data: {
        idCentre: this.idCentre
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp !== 'cancel') {
        this.teachers.push(resp);
        this.dataSource = new MatTableDataSource(this.teachers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  seeTeacher(teacher) {
    this.dialog.open(DialogSeeTeacherComponent, {
      data: {
        teacher: teacher
      }
    });
  }

  associateCourse(teacher) {

  }

  deleteTeacher(teacher) {

  }

}
