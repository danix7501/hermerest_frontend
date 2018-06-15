import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-see-circular',
  templateUrl: './dialog-see-circular.component.html',
  styleUrls: ['./dialog-see-circular.component.css']
})
export class DialogSeeCircularComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSeeCircularComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
