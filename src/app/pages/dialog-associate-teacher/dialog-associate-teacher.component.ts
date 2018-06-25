import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogAddCourseComponent} from '../dialog-add-course/dialog-add-course.component';

@Component({
  selector: 'app-dialog-associate-teacher',
  templateUrl: './dialog-associate-teacher.component.html',
  styleUrls: ['./dialog-associate-teacher.component.css']
})
export class DialogAssociateTeacherComponent implements OnInit {

  associatedTeacherForm: FormGroup;
  teacherCtrl: FormControl = new FormControl('', Validators.required);
  filteredTeachers: Observable<any>;
  teachers: any[] = [];
  submit = false;
  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    this.associatedTeacherForm = this.formBuilder.group({
      teacher: [''],
    });
    this.getTeachers();
  }

  updateValues() {
    this.filteredTeachers = this.teacherCtrl.valueChanges
      .startWith(null)
      .map(teacher => teacher && typeof teacher === 'object' ? teacher.name : teacher)
      .map(name => name ? this.filteredTeacher(name) : this.teachers.slice());
  }
  getTeachers() {
    this.http.get('/centres/' + this.data.idCentre + '/teachers?course=noCourse').subscribe((resp: any) => {
      if (resp.content) {
        this.teachers = resp.content.teachers;
      }
      this.updateValues();
    });
  }

  associateTeacher() {
    this.http.post('/courses/' + this.data.idCourse + '/teacher/' + this.teacherCtrl.value.id, '').subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Profesor asociado correctamente' , {positionClass : 'toast-bottom-right'});
          this.onNoClick();
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      },
      error => this.toastr.error('Ha ocurrido un problema al intentar asociar el profesor al curso', 'Error',{positionClass : 'toast-bottom-right'})
    );
  }

  filteredTeacher(name: any) {
    return this.teachers.filter(teacher =>
      (teacher.name.toLowerCase()).indexOf(name.toLowerCase()) >= 0);
  }


  displayFn(teacher: any): string {
    if (teacher) {
      return teacher.name;
    }
  }

  checkForm() {
    if (this.associatedTeacherForm['teacher'] !== '' && this.teacherCtrl.value.id) {
      this.submit = true;
    } else {
      this.submit = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
