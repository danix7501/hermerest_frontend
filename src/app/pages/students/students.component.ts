import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {DialogAddStudentComponent} from '../dialog-add-student/dialog-add-student.component';
import {ToastrService} from 'ngx-toastr';
import {DialogAssociateTeacherComponent} from '../dialog-associate-teacher/dialog-associate-teacher.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any[] = [];
  statusTeacher: any;

  displayedColumns = ['name', 'surname', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() idCourse: any;
  @Input() idCentre: any;
  @Input() nameCourse: any;
  @Output('update') change = new EventEmitter();


  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCourse();
    this.getStudentsOfCourse();
  }

  getStudentsOfCourse() {
    this.http.get('/courses/' + this.idCourse + '/students').subscribe( (resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.students.length; i++) {
          this.students.push(resp.content.students[i]);
        }

        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  seeStudent(student) {
    this.change.emit(student);
  }

  addStudent() {
    this.dialog.open(DialogAddStudentComponent, {
      data: {
        idCourse: this.idCourse,
        idCentre: this.idCentre
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp !== 'cancel') {
        this.students.push(resp);
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  getCourse() {
    this.http.get('/courses/' +  this.idCourse).subscribe((resp: any) => {
      if (resp.success) {
        this.statusTeacher = resp.content.teacher;
      }
    });
  }

  associateTeacher() {
    this.dialog.open(DialogAssociateTeacherComponent, {
      data: {
        idCourse: this.idCourse,
        idCentre: this.idCentre
      }
    });
  }

  deleteStudent(student) {
    this.dialog.open(DialogDeleteComponent, {
      data: {
        url: '/students/' + student.id + '/course',
        title: 'Desasociar alumno del curso',
        messageSuccess: 'Alumno desasociado correctamente',
        messageError: 'Ha ocurrido un problema al intentar desasociar al alumno',
        question: '¿Esta seguro que quiere desasociar este alumno?'
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

  back() {
    this.change.emit(1);
  }

}
