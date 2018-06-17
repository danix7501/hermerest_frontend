import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-see-teacher',
  templateUrl: './dialog-see-teacher.component.html',
  styleUrls: ['./dialog-see-teacher.component.css']
})
export class DialogSeeTeacherComponent implements OnInit {

  sendNewPasswordForm: FormGroup;
  idUser: any;

  constructor(private http: HttpUsingFormDataService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<DialogSeeTeacherComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.sendNewPasswordForm = this.formBuilder.group({
      name: [''],
      username: [''],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.getInformationTeacher();
  }

  getInformationTeacher() {
    this.http.get('/teachers/' + this.data.teacher.id).subscribe((resp: any) => {
      if (resp.content) {
        this.sendNewPasswordForm['username'] = resp.content.teacher.username;
        this.idUser = resp.content.teacher.sub;
      }
    });
  }

  changePassword() {
    this.http.put('/changePassword/' + this.idUser, this.sendNewPasswordForm).subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Contraseña cambiada correctamente', {positionClass: 'toast-bottom-right'});
          this.onNoClick();
        } else {
          this.toastr.error(resp.error, 'Error', {positionClass: 'toast-bottom-right'});
        }
      },
      error => this.toastr.error('Ha ocurrido un problema al intentar cambiar la contraseña', 'Error', {positionClass: 'toast-bottom-right'})
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
