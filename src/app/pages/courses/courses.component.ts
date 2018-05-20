import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {DialogAddCourseComponent} from '../dialog-add-course/dialog-add-course.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  idAdministrator: any;
  courses: any[] = [];
  nameCentre: any;
  idCentre: any;

  displayedColumns = ['nameCourse', 'numberOfStudents', 'actions'];
  dataSource: any;

  @Output('update') change = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.idAdministrator = new JwtHelper().decodeToken(localStorage.getItem('token')).id;
    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      this.nameCentre = resp.content.centre.name;
      this.idCentre = resp.content.centre.id;
      this.http.get('/centres/' + this.idCentre + '/courses').subscribe((resp2: any) => {
        if (resp2.content) {
          for (let i = 0; i < resp2.content.courses.length; i++) {
            this.courses.push(resp2.content.courses[i]);
          }
          this.dataSource = new MatTableDataSource(this.courses);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    });
  }

  seeStudents(course) {
    this.change.emit(course);
  }


  addCourse() {
    console.log('añadir curso');
    this.dialog.open(DialogAddCourseComponent, {
      data: {
        idCentre: this.idCentre
      }
    });
  }

  deleteCourse(course) {
    this.dialog.open(DialogDeleteComponent, {
      data: {
        url: '/courses/' + course.id,
        title: 'Eliminar curso',
        messageSuccess: 'Curso eliminado correctamente',
        messageError: 'Ha ocurrido un problema al intentar eliminar el curso',
        question: '¿Esta seguro que quiere eliminar este curso?'
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp === 'delete') {
        const index = this.courses.indexOf(course);
        this.courses.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

}

