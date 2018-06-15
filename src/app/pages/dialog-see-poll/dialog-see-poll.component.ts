import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-see-poll',
  templateUrl: './dialog-see-poll.component.html',
  styleUrls: ['./dialog-see-poll.component.css']
})
export class DialogSeePollComponent implements OnInit {

  constructor(private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogSeePollComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
