import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-see-teacher',
  templateUrl: './dialog-see-teacher.component.html',
  styleUrls: ['./dialog-see-teacher.component.css']
})
export class DialogSeeTeacherComponent implements OnInit {

  sendNewPasswordForm: FormGroup;

  constructor(private http: HttpUsingFormDataService,
              private formBuilder: FormBuilder,
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
      }
    });
  }


  onNoClick(teacher): void {
    this.dialogRef.close(teacher);
  }
}
