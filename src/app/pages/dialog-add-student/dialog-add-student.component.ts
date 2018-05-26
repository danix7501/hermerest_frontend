import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogAddCourseComponent} from '../dialog-add-course/dialog-add-course.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-add-student',
  templateUrl: './dialog-add-student.component.html',
  styleUrls: ['./dialog-add-student.component.css']
})
export class DialogAddStudentComponent implements OnInit {

  addStudentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    this.addStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      course: [''],
      centre: ['']
    });
  }

  add() {
    this.addStudentForm['course'] = this.data.idCourse;
    this.addStudentForm['centre'] = this.data.idCentre;
    this.http.post('/students', this.addStudentForm).subscribe((resp: any) => {
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

  onNoClick(student): void {
    this.dialogRef.close(student);
  }

}
