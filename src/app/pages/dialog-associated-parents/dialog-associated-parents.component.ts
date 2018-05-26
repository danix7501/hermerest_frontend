import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-associated-parents',
  templateUrl: './dialog-associated-parents.component.html',
  styleUrls: ['./dialog-associated-parents.component.css']
})
export class DialogAssociatedParentsComponent implements OnInit {

  associatedParents: FormGroup;
  parents: any[] = [];
  parentsAux: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogAssociatedParentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    this.associatedParents = this.formBuilder.group({
      name: [''],
      telephone: ['', Validators.required],
    });

    this.parentsOfCentre();
  }

  parentsOfCentre() {
    this.http.get('/centres/' + this.data.idCentre + '/parents').subscribe((resp: any) => {
      if (resp.success) {
        for (let i = 0; i < resp.content.parents.length; i++) {
          this.parents.push(resp.content.parents[i]);
        }
        this.parentsAux = this.parents;
      }
    });
  }

  associated() {
    this.http.post('/students/' + this.data.idStudent + '/parents/' + this.associatedParents['telephone'], '').subscribe((resp: any) => {
      if (resp.success) {
        this.toastr.success('', 'Padres asociados correctamente' , {positionClass : 'toast-bottom-right'});
        this.onNoClick(resp.content);
      } else {
        this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
      }
    },
      error => this.toastr.error('Ha ocurrido un problema al intentar asociar padres', 'Error' , {positionClass : 'toast-bottom-right'})
    );
  }

  filterByTelephone() {

    const searchTerm = this.associatedParents['telephone'];

    // Search
    if ( searchTerm === '' ) {
      this.associatedParents['name'] = '';
    } else {
      this.parents = this.parentsAux.filter((parent) => {

        if (parent.telephone === searchTerm) {
          this.associatedParents['name'] = parent.name;
        }
      });
    }
  }

  onNoClick(parent): void {
    this.dialogRef.close(parent);
  }

}
