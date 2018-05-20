import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any[] = [];
  nameCourse: any;


  displayedColumns = ['name', 'surname', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() idCourse: any;
  @Output('update') change = new EventEmitter();


  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getStudentsOfCourse();
  }

  getStudentsOfCourse() {
    this.http.get('/courses/' + this.idCourse + '/students').subscribe( (resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.students.length; i++) {
          this.students.push(resp.content.students[i]);
        }
        this.nameCourse = this.students[0].course.name;

        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  seeStudent(student) {
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
      if (resp === 'delete') {
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
