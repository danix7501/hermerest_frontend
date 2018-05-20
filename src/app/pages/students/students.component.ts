import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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


  constructor(private http: HttpUsingFormDataService) { }

  ngOnInit() {
    this.getStudentsOfCourse();
  }

  getStudentsOfCourse() {
    this.http.get('/courses/' + this.idCourse + '/students').subscribe( (resp: any) => {
      console.log(5, resp);
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
    console.log(1, student);
    this.change.emit(student);
  }

  deleteStudent(student) {
    console.log(2, student);
  }

  back() {
    this.change.emit(1);
  }

}
