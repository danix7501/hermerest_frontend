import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-see-poll',
  templateUrl: './dialog-see-poll.component.html',
  styleUrls: ['./dialog-see-poll.component.css']
})
export class DialogSeePollComponent implements OnInit {

  pollsReplies: any[] = [];
  constructor(private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogSeePollComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getRepliesPoll();
  }

  getRepliesPoll() {
    this.http.get('/polls/replies?poll=' + this.data.poll.id).subscribe((resp: any) => {
      if (resp.content) {
        this.pollsReplies = resp.content.pollsReplies;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
