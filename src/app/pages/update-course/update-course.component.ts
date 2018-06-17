import { Component, OnInit } from '@angular/core';
import {DropEvent} from 'ng2-drag-drop';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {ToastrService} from 'ngx-toastr';

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
  studentsAux: any[] = [];
  students2: any[] = [];

  currentCourse1: any;
  currentCourse2: any;

  updates: any[] = [];
  idCourse: any;

  constructor(private http: HttpUsingFormDataService, private toastr: ToastrService) { }

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
    this.courses2 = [];
    if (event || event === 'update') {
      this.http.get('/courses/' + this.currentCourse1.id + '/students').subscribe((resp: any) => {
        if (resp.content) {
          for (let i = 0; i < resp.content.students.length; i++) {
            resp.content.students[i]['status'] = 0;
          }
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
    if (event) {
      this.http.get('/courses/' + this.currentCourse2.id + '/students').subscribe((resp: any) => {
        if (resp.content) {
          for (let i = 0; i < resp.content.students.length; i++) {
            resp.content.students[i]['status'] = 0;
          }
          this.students2 = resp.content.students;
        }
      });
    }
  }

  onList1Drop(e: DropEvent) {
    if (e.dragData.status === 1) {
      e.dragData.status = 0;
      e.dragData.course = this.currentCourse1;
    } else {
      e.dragData.status = 2;
    }
    if (e.dragData.status !== 2) {
      this.students1.push(e.dragData);
      this.removeItem(e.dragData, this.students2);
    } else {
      this.toastr.error('No se puede bajar un alumno de curso', 'Error' , {positionClass : 'toast-bottom-right'});
    }
  }

  onList2Drop(e: DropEvent) {
    if (this.currentCourse2) {
      if (e.dragData.status === 2) {
        e.dragData.status = 0;
      } else {
        e.dragData.status = 1;
        e.dragData.course = this.currentCourse2;
      }

      this.students2.push(e.dragData);
      this.removeItem(e.dragData, this.students1);
    } else {
      this.toastr.error('Seleccione un curso objetivo', 'Error' , {positionClass : 'toast-bottom-right'});
    }

  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name;
    }).indexOf(item.name);
    list.splice(index, 1);
  }

  updateCourse() {
    this.updates = [];
    for (let i = 0; i < this.students2.length; i++) {

      if (this.students2[i].status === 1) {
        this.updates.push(this.students2[i].id);
        this.idCourse = this.students2[i].course.id;
      }
    }

    if (this.updates.length > 0) {
      const json = {
        'studentsIds': this.updates
      };
      this.http.put('/courses/' + this.idCourse, json).subscribe((resp: any) => {
        if (resp.success) {
          this.findStundentsByCourse2('update');
          this.toastr.success('', 'Curso actualizado correctamente' , {positionClass : 'toast-bottom-right'});
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      }, error1 => {this.toastr.error('Ha ocurrido un problema al actualizar el curso', 'Error' , {positionClass : 'toast-bottom-right'});
      });
    }
  }

}