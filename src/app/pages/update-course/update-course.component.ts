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
  students2: any[] = [];

  studentsAux1: any[] = [];
  studentsAux2: any[] = [];

  currentCourse1: any;
  currentCourse2: any;

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
    if (this.currentCourse1 === this.currentCourse2) {
      this.courses2 = [];
      this.students2 = [];
      this.currentCourse2 = null;
    }

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
    if (event || event === 'update') {
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
    if (e.dragData.length > 0) {
      this.studentsAux2 = [];
      for (let i = 0; i < e.dragData.length; i++) {
        if (e.dragData[i].selected) {
          e.dragData[i].selected = false;
          e.dragData[i].course = this.currentCourse1;
          this.studentsAux2.push(e.dragData[i].id);
          this.students1.push(e.dragData[i]);
          this.removeItem(e.dragData[i], this.students2);
        }
      }
      this.updateCourse(this.studentsAux2, this.currentCourse1.id);
    }


  }

  onList2Drop(e: DropEvent) {
    if (this.currentCourse2) {
        if (e.dragData.length > 0) {
        this.studentsAux1 = [];
        for (let i = 0; i < e.dragData.length; i++) {
          if (e.dragData[i].selected) {
            e.dragData[i].selected = false;
            e.dragData[i].course = this.currentCourse2;
            this.studentsAux1.push(e.dragData[i].id);
            this.students2.push(e.dragData[i]);
            this.removeItem(e.dragData[i], this.students1);
          }
        }
        this.updateCourse(this.studentsAux1, this.currentCourse2.id);
    }
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


  selectedItem1(student) {
    if (student.selected) {
      student['selected'] = false;
      this.removeItem(student, this.studentsAux1);
    } else {
      student['selected'] = true;
    }
    if (!this.studentsAux1.includes(student)) {
      this.studentsAux1.push(student);
      student['selected'] = true;
    }
  }

  selectedItem2(student) {
    if (student.selected) {
      student['selected'] = false;
      this.removeItem(student, this.studentsAux2);
    } else {
      student['selected'] = true;
    }
    if (!this.studentsAux2.includes(student)) {
      this.studentsAux2.push(student);
      student['selected'] = true;
    }
  }

  drag1(student) {
    if (this.currentCourse2) {
      student.course = this.currentCourse2;
      this.students2.push(student);
      this.updateCourse(student.id, this.currentCourse2.id);
      this.removeItem(student, this.students1);
    }

  }

  drag2(student) {
    student.course = this.currentCourse1;
    this.students1.push(student);
    this.updateCourse(student.id, this.currentCourse1.id);
    this.removeItem(student, this.students2);
  }

  updateCourse(students, idCourse) {

    if (students) {
      const json = {
        'studentsIds': students
      };
      this.studentsAux1 = [];
      this.studentsAux2 = [];
      this.http.put('/courses/' + idCourse, json).subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Cambio de curso realizado correctamente' , {positionClass : 'toast-bottom-right'});
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      }, error1 => {this.toastr.error('Ha ocurrido un problema al cambiar el alumno de curso', 'Error' , {positionClass : 'toast-bottom-right'});
      });
    }

  }

}
