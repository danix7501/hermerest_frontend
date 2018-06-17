import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nameAdministrador: any;
  showComponent: any;
  idCourse: any;
  idCentre: any;
  nameCourse: any;
  idStudent: any;
  backView: any;
  open: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.open = true;
    this.showComponent = 1;
    if (localStorage.getItem('rol') !== 'administrator') {
      this.router.navigate(['/login']);
    }
    this.nameAdministrador = new JwtHelper().decodeToken(localStorage.getItem('token')).name;

  }

  logout() {
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  changeView(view) {
    this.backView = 0;
    this.showComponent = view;
  }

  hideCoursesComponent(event) {
    this.idCourse = event.id;
    this.idCentre = event.centre.id;
    this.nameCourse = event.name;
    this.showComponent = 2;
  }

  hideStudentsComponent(event) {
    this.idStudent = event.id;
    this.backView = 2;
    if (event === 1) {
      this.showComponent = 1;
    } else {
      this.showComponent = 3;
    }
  }

  hideProfileStudentComponent(event) {
    this.showComponent = event;
  }

  hideAllStudentsComponent(event) {
    this.idStudent = event.id;
    this.showComponent = 3;
    this.backView = 4;
  }

}
