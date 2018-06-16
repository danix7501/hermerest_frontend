import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-dialog-add-course',
  templateUrl: './dialog-add-course.component.html',
  styleUrls: ['./dialog-add-course.component.css']
})
export class DialogAddCourseComponent implements OnInit {

  addCourseForm: FormGroup;
  teacherCtrl: FormControl = new FormControl('', Validators.required);
  filteredTeachers: Observable<any>;
  teachers: any[] = [];
  submit = false;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) {}

  ngOnInit() {
    this.addCourseForm = this.formBuilder.group({
      name: ['', Validators.required],
      teacher: [''],
      centre: ['']
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
    this.http.get('/centres/' + this.data.idCentre + '/teachers').subscribe((resp: any) => {
      if (resp.content) {
        this.teachers = resp.content.teachers;
      }
      this.updateValues();
    });
  }

  add() {
    this.addCourseForm['centre'] = this.data.idCentre;
    this.addCourseForm['teacher'] = this.teacherCtrl.value.id;
    this.http.post('/courses', this.addCourseForm).subscribe((resp: any) => {
      if (resp.success) {
        this.toastr.success('', 'Curso añadido correctamente' , {positionClass : 'toast-bottom-right'});
        this.onNoClick(resp.content);
      } else {
        this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
      }
    },
      error => this.toastr.error('Ha ocurrido un problema al intentar añadir el curso ', 'Error' , {positionClass : 'toast-bottom-right'})
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
    if (this.addCourseForm['name'] !== '' && this.teacherCtrl.value.id) {
      this.submit = true;
    } else {
      this.submit = false;
    }
  }

  onNoClick(course): void {
    this.dialogRef.close(course);
  }

}
