import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {DialogAddCourseComponent} from '../dialog-add-course/dialog-add-course.component';
import {ToastrService} from 'ngx-toastr';


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
  fileToUpload: any;
  nameFile: any;

  displayedColumns = ['nameCourse', 'numberOfStudents', 'actions'];
  dataSource: any;

  @Output('update') change = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit() {
    this.idAdministrator = new JwtHelper().decodeToken(localStorage.getItem('token')).id;
    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      this.nameCentre = resp.content.centre.name;
      this.idCentre = resp.content.centre.id;
      this.getCourses(this.idCentre);
    });
  }

  getCourses(idCentre) {
    this.http.get('/centres/' + idCentre + '/courses').subscribe((resp: any) => {
      this.courses = [];
      if (resp.content) {
        for (let i = 0; i < resp.content.courses.length; i++) {
          this.courses.push(resp.content.courses[i]);
        }
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  seeStudents(course) {
    this.change.emit(course);
  }

  addCourse() {
    this.dialog.open(DialogAddCourseComponent, {
      data: {
        idCentre: this.idCentre
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp !== 'cancel') {
        this.courses.push(resp);
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      if (resp && resp === 'delete') {
        const index = this.courses.indexOf(course);
        this.courses.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.nameFile = files.item(0).name;
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('centre', this.idCentre);

    if (this.fileToUpload !== null) {
      this.http.postFile('/courses/importCourse', formData).subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Curso importado correctamente' , {positionClass : 'toast-bottom-right'});
          this.getCourses(this.idCentre);
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      },
        error => this.toastr.error('Ha ocurrido un problema al intentar importar el curso', 'Error',{positionClass : 'toast-bottom-right'})
      );
    }
  }

}

