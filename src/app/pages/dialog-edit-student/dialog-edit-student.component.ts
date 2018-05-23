import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-edit-student',
  templateUrl: './dialog-edit-student.component.html',
  styleUrls: ['./dialog-edit-student.component.css']
})
export class DialogEditStudentComponent implements OnInit {

  editStudentForm: FormGroup;
  courses: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogEditStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    this.editStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      course: ['']
    });

    this.editStudentForm['name'] = this.data.nameStudent;
    this.editStudentForm['surname'] = this.data.surnameStudent;
    this.editStudentForm['course'] = this.data.idCourse;

    this.getCoursesOfCentre();

  }

  getCoursesOfCentre() {
    this.http.get('/centres/' + this.data.idCentre + '/courses').subscribe((resp: any) => {
      this.courses = [];
      for (let i = 0; i < resp.content.courses.length; i++) {
        this.courses.push(resp.content.courses[i]);
      }
    });
  }

  edit() {
    this.http.put('/students/' + this.data.idStudent, this.editStudentForm).subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Alumno editado correctamente' , {positionClass : 'toast-bottom-right'});
          this.onNoClick(resp.content);
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      },
      error => this.toastr.error('Ha ocurrido un problema al intentar editar al alumno', 'Error' , {positionClass : 'toast-bottom-right'})
    );
  }

  onNoClick(student): void {
    this.dialogRef.close(student);
  }

}
