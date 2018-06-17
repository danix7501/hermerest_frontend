import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';
import {DialogAddPollComponent} from '../dialog-add-poll/dialog-add-poll.component';

@Component({
  selector: 'app-dialog-edit-limitdate',
  templateUrl: './dialog-edit-limitdate.component.html',
  styleUrls: ['./dialog-edit-limitdate.component.css']
})
export class DialogEditLimitdateComponent implements OnInit {

  editLimitDateForm: FormGroup;
  currentDate = new Date();
  url: any;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAddPollComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.editLimitDateForm = this.formBuilder.group({
      newLimitDate: ['', Validators.required]
    });
    if (this.data.type === 'authorization') {
      this.url = '/authorizations/' + this.data.authorization.id + '/editLimitDate';
      this.editLimitDateForm['newLimitDate'] = new Date(this.data.authorization.limitDate.date);
    }
    if (this.data.type === 'poll') {
      this.url = '/polls/' + this.data.poll.id + '/editLimitDate';
      this.editLimitDateForm['newLimitDate'] = new Date(this.data.poll.limitDate.date);
    }
  }


  edit() {
    this.editLimitDateForm['newLimitDate'] = this.editLimitDateForm['newLimitDate'].getFullYear() + '-'
    + (this.editLimitDateForm['newLimitDate'].getMonth() + 1) + '-'
    + this.editLimitDateForm['newLimitDate'].getDate()
    this.http.put(this.url, this.editLimitDateForm).subscribe((resp: any) => {
        if (resp.success) {
          this.toastr.success('', 'Fecha límite editada correctamente' , {positionClass : 'toast-bottom-right'});
          if (this.data.type === 'poll') {
            this.onNoClick(resp.content.poll);
          }
          if (this.data.type === 'authorization') {
            this.onNoClick(resp.content.authorization);
          }
        } else {
          this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
        }
      },
      error => this.toastr.error('Ha ocurrido un problema al intentar editar la fecha límite', 'Error' , {positionClass : 'toast-bottom-right'})
    );
  }

  onNoClick(message): void {
    this.dialogRef.close(message);
  }

}
