import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  checkButton: any;

  constructor(private http: HttpUsingFormDataService, public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
  }

  delete() {
    this.http.delete(this.data.url).subscribe((resp: any) => {
      if (resp.success) {
        this.toastr.success('', this.data.messageSuccess , {positionClass : 'toast-bottom-right'});
        this.checkButton = 'delete';
        this.onNoClick(this.checkButton);
      } else {
        this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
      }
    },
      error => this.toastr.error(this.data.messageError, 'Error' , {positionClass : 'toast-bottom-right'})
    );
  }

  onNoClick(checkButton): void {
    this.dialogRef.close(checkButton);
  }

}
