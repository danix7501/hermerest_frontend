import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-register-teacher',
  templateUrl: './dialog-register-teacher.component.html',
  styleUrls: ['./dialog-register-teacher.component.css']
})
export class DialogRegisterTeacherComponent implements OnInit {

  registerTeacherForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogRegisterTeacherComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.registerTeacherForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      centre: [''],
      rol: ['']
    });
  }

  register() {
    this.registerTeacherForm['centre'] = this.data.idCentre;
    this.registerTeacherForm['rol'] = 'teacher';
    this.http.post('/register', this.registerTeacherForm).subscribe((resp: any) => {
      if (resp.success) {
        this.toastr.success('', 'Profesor registrado correctamente' , {positionClass : 'toast-bottom-right'});
        this.onNoClick(resp.content.teacher);
      } else {
        this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
      }
    }, error => {this.toastr.error('Ha ocurrido un error al intentar registrar al profesor', 'Error' , {positionClass : 'toast-bottom-right'});
    });
  }


  onNoClick(teacher): void {
    this.dialogRef.close(teacher);
  }

}
