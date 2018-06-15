import {Component, Inject, OnInit} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-see-authorization',
  templateUrl: './dialog-see-authorization.component.html',
  styleUrls: ['./dialog-see-authorization.component.css']
})
export class DialogSeeAuthorizationComponent implements OnInit {

  authorized: any[] = [];
  noAuthorized: any[] = [];

  constructor(private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogSeeAuthorizationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getRepliesAuthorization();
  }

  getRepliesAuthorization() {
    this.http.get('/authorizations/replies?authorization=' + this.data.authorization.id).subscribe((resp: any) => {
      console.log(resp);
      if (resp.content) {
        for (let i = 0; i < resp.content.authorizationsReplies.length; i++) {
          if (resp.content.authorizationsReplies[i].authorized) {
            this.authorized.push(resp.content.authorizationsReplies[i]);
          } else {
            this.noAuthorized.push(resp.content.authorizationsReplies[i]);
          }
        }
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
