import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  idAdministrator: any;
  courses: any[] = [];

  displayedColumns = ['nameCourse', 'numberOfStudents', 'actions'];
  dataSource: any;

  @Output('update') change = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpUsingFormDataService, private router: Router) {
    this.idAdministrator = new JwtHelper().decodeToken(localStorage.getItem('token')).id;
    this.getAdministrator();
  }

  ngOnInit() {


  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      this.http.get('/centres/' + resp.content.centre.id + '/courses').subscribe((resp2: any) => {
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

  seeStudents(course){
    console.log(course);
    this.change.emit(course);
  }

  deleteCourse(course){

  }

}

