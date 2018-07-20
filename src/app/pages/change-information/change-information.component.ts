import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from "angular2-jwt";

@Component({
  selector: 'app-change-information',
  templateUrl: './change-information.component.html',
  styleUrls: ['./change-information.component.css']
})
export class ChangeInformationComponent implements OnInit {

  changeInformationForm: FormGroup;
  idAdministrator: any;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<ChangeInformationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    const decodeToken = new JwtHelper().decodeToken(localStorage.getItem('token'));
    this.idAdministrator = decodeToken.id;

    this.changeInformationForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: [''],
      newPasswordConfirm: [''],
    });

    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      this.changeInformationForm['name'] = resp.content.name;
      this.changeInformationForm['username'] = resp.content.username;
    });
  }

  edit() {

    this.http.put('/administrators/' + this.idAdministrator, this.changeInformationForm).subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Datos modificados correctamente' , {positionClass : 'toast-bottom-right'});
          this.onNoClick({name: this.changeInformationForm['name'], username: this.changeInformationForm['username']});
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      }, error => this.toastr.error('Hubo un error al intentar modificar los datos', 'Error' , {positionClass : 'toast-bottom-right'})
    );
  }

  onNoClick(information): void {
    this.dialogRef.close(information);
  }
}
