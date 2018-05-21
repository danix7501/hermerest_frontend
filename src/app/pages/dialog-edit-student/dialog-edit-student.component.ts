import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DialogAddCourseComponent} from '../dialog-add-course/dialog-add-course.component';

@Component({
  selector: 'app-dialog-edit-student',
  templateUrl: './dialog-edit-student.component.html',
  styleUrls: ['./dialog-edit-student.component.css']
})
export class DialogEditStudentComponent implements OnInit {

  editStudentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogEditStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    this.editStudentForm = this.formBuilder.group({
      name: [this.data.nameStudent, Validators.required],
      surname: [this.data.surnameStudent, Validators.required],
    });

    this.editStudentForm['name'] = this.data.nameStudent;
    this.editStudentForm['surname'] = this.data.surnameStudent;
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
