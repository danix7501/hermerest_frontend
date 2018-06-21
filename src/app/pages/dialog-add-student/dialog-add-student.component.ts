import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogAddCourseComponent} from '../dialog-add-course/dialog-add-course.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dialog-add-student',
  templateUrl: './dialog-add-student.component.html',
  styleUrls: ['./dialog-add-student.component.css']
})
export class DialogAddStudentComponent implements OnInit {

  addStudentForm: FormGroup;
  studentCtrl: FormControl = new FormControl('', Validators.required);
  filteredStudents: Observable<any>;
  students: any[] = [];
  submit = false;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    this.addStudentForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      course: [''],
      centre: ['']
    });

    this.getStudents();
  }

  updateValues() {
    this.filteredStudents = this.studentCtrl.valueChanges
      .startWith(null)
      .map(student => student && typeof student === 'object' ? student.name : student)
      .map(name => name ? this.filteredStudent(name) : this.students.slice());
  }

  getStudents() {
    this.http.get('/students').subscribe((resp: any) => {
      if (resp.content) {
        this.students = resp.content.students;
      }
      this.updateValues();
    });
  }

  add() {
    this.addStudentForm['course'] = this.data.idCourse;
    this.addStudentForm['centre'] = this.data.idCentre;
    this.addStudentForm['name'] = this.studentCtrl.value.name;
    this.addStudentForm['surname'] = this.studentCtrl.value.surname;
    this.http.put('/courses/' + this.data.idCourse + '/student/' + this.studentCtrl.value.id, this.addStudentForm).subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Alumno añadido correctamente' , {positionClass : 'toast-bottom-right'});
          this.onNoClick(resp.content);
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      },
      error => this.toastr.error('Ha ocurrido un problema al intentar añadir al alumno', 'Error' , {positionClass : 'toast-bottom-right'})
    );
  }

  filteredStudent(name: any) {
    return this.students.filter(student =>
      (student.name.toLowerCase()).indexOf(name.toLowerCase()) >= 0);
  }


  displayFn(student: any): string {
    if (student) {
      return student.name + ' ' + student.surname;
    }
  }

  checkForm() {
    if (this.addStudentForm['name'] !== '' && this.studentCtrl.value.id) {
      this.submit = true;
    } else {
      this.submit = false;
    }
  }

  onNoClick(student): void {
    this.dialogRef.close(student);
  }

}
