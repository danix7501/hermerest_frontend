import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {DialogRegisterStudentComponent} from '../dialog-register-student/dialog-register-student.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dialog-see-authorization',
  templateUrl: './dialog-see-authorization.component.html',
  styleUrls: ['./dialog-see-authorization.component.css']
})
export class DialogSeeAuthorizationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogRegisterStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService) { }

  ngOnInit() {
    console.log(this.data.authorization);
  }

}
