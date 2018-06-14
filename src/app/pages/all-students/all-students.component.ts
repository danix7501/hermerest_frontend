import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {DialogRegisterStudentComponent} from '../dialog-register-student/dialog-register-student.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  students: any[] = [];
  studentsAux: any[] = [];
  courses: any [] = [];
  idAdministrator: any;
  idCentre: any;
  currentCourse: any;

  displayedColumns = ['student', 'course', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output('update') change = new EventEmitter();

  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog) { }

  ngOnInit() {
    const decodeToken = new JwtHelper().decodeToken(localStorage.getItem('token'));
    this.idAdministrator = decodeToken.id;
    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      if (resp.content) {
        this.idCentre = resp.content.centre.id;
        this.getStudents(this.idCentre);
        this.getCoursesOfCentre(this.idCentre);
      }
    });
  }

  getStudents(idCentre) {
    this.http.get('/centres/' + idCentre + '/students').subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.students.length; i++) {
          this.students.push(resp.content.students[i]);
        }
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.studentsAux = this.students;
      }
    });
  }

  getCoursesOfCentre(idCentre) {
    this.http.get('/centres/' + idCentre + '/courses').subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.courses.length; i++) {
          this.courses.push(resp.content.courses[i]);
        }
      }
    });
  }

  seeStudents(student) {
    this.change.emit(student);
  }

  deleteStudent(student) {
    this.dialog.open(DialogDeleteComponent, {
      data: {
        url: '/students/' + student.id,
        title: 'Eliminar alumno',
        messageSuccess: 'Alumno eliminado correctamente',
        messageError: 'Ha ocurrido un problema al intentar eliminar el alumno',
        question: '¿Esta seguro que quiere eliminar este alumno?'
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp === 'delete') {
        const index = this.students.indexOf(student);
        this.students.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  registerStudent() {
    this.dialog.open(DialogRegisterStudentComponent, {
      data: {
        idCentre: this.idCentre
      }
    }).afterClosed().subscribe((resp:any) => {
      if (resp && resp !== 'cancel') {
        this.students.push(resp);
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  filterByCourse() {
    if (this.currentCourse === 'all') {
      this.students = this.studentsAux;
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.students = this.studentsAux.filter((student) => {
        return student.course.id === this.currentCourse;
      });
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  searchStudentByNameOrSurname(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
