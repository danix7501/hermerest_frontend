import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showComponent: any;
  idCourse: any;
  idStudent: any;

  constructor(private router: Router) { }

  ngOnInit() {

    this.showComponent = 1;
    if (localStorage.getItem('rol') !== 'administrator') {
      this.router.navigate(['/login']);
    }

  }

  logout() {
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  hideCoursesComponent(event) {
    this.idCourse = event.id;
    this.showComponent = 2;
  }

  hideStudentsComponent(event) {
    this.idStudent = event.id;
    if (event === 1) {
      this.showComponent = 1;
    } else {
      this.showComponent = 3;
    }
  }

  hideProfileStudentComponent(event) {
    this.showComponent = event;
  }

}
