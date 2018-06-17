import { Component, OnInit } from '@angular/core';
import {DropEvent} from 'ng2-drag-drop';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {


  idAdministrator: any;
  idCentre: any;

  courses1: any[] = [];
  courses2: any[] = [];

  students1: any[] = [];
  students2: any[] = [];

  currentCourse1: any;
  currentCourse2: any;


  constructor(private http: HttpUsingFormDataService) { }

  ngOnInit() {
    const decodeToken = new JwtHelper().decodeToken(localStorage.getItem('token'));
    this.idAdministrator = decodeToken.id;
    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      if (resp.content) {
        this.idCentre = resp.content.centre.id;
        this.getCourses(this.idCentre);
      }
    });
  }

  getCourses(idCentre) {
    this.http.get('/centres/' + idCentre + '/courses').subscribe((resp: any) => {
      if (resp.content) {
        this.courses1 = resp.content.courses;
      }
    });
  }

  findStundentsByCourse1(event) {
    console.log(1, event);
    this.courses2 = [];
    if (event) {
      this.http.get('/courses/' + this.currentCourse1.id + '/students').subscribe((resp: any) => {
        if (resp.content) {
          this.students1 = resp.content.students;
        }
      });

      for (let i = 0; i < this.courses1.length; i++) {
        if (this.currentCourse1.id !== this.courses1[i].id) {
          this.courses2.push(this.courses1[i]);
        }
      }
    }
  }

  findStundentsByCourse2(event) {
    console.log(2, event);
    if (event) {
      this.http.get('/courses/' + this.currentCourse2.id + '/students').subscribe((resp: any) => {
        if (resp.content) {
          this.students2 = resp.content.students;
        }
      });
    }
  }

  onList1Drop(e: DropEvent) {
    console.log(1, e);
    if (e.dragData.status === 1) {
      e.dragData.status = 0;
      e.dragData.course = this.currentCourse1;
    } else {
      e.dragData.status = 2;
    }
    this.students1.push(e.dragData);
    this.removeItem(e.dragData, this.students2);
  }

  onList2Drop(e: DropEvent) {
    console.log(2, e);
    if (e.dragData.status === 2) {
      e.dragData.status = 0;
    } else {
      e.dragData.status = 1;
      e.dragData.course = this.currentCourse2;
    }

    this.students2.push(e.dragData);
    this.removeItem(e.dragData, this.students1);
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name;
    }).indexOf(item.name);
    list.splice(index, 1);
  }

  updateCourse() {
    console.log('realizar un tratamiento del segundo array desde el backend');
  }

}
