import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-add-course',
  templateUrl: './dialog-add-course.component.html',
  styleUrls: ['./dialog-add-course.component.css']
})
export class DialogAddCourseComponent implements OnInit {

  addCourseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAddCourseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) {}

  ngOnInit() {
    this.addCourseForm = this.formBuilder.group({
      name: ['', Validators.required],
      centre: ['']
    });
  }

  add() {
    this.addCourseForm['centre'] = this.data.idCentre;
    this.http.post('/courses', this.addCourseForm).subscribe((resp: any) => {
      if (resp.success) {
        this.toastr.success('', 'Curso añadido correctamente' , {positionClass : 'toast-bottom-right'});
        this.onNoClick();
      } else {
        this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
      }
    },
      error => this.toastr.error('Ha ocurrido un problema al intentar añadir el curso ', 'Error' , {positionClass : 'toast-bottom-right'})
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
