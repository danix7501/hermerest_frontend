import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dialog-register-student',
  templateUrl: './dialog-register-student.component.html',
  styleUrls: ['./dialog-register-student.component.css']
})
export class DialogRegisterStudentComponent implements OnInit {

  registerStudentForm: FormGroup;
  courses: any[] = [];
  parents: any[] = [];
  parentsAux: any[] = [];
  addParentsContainer: any[] = [];
  telephoneParents: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              public dialogRef: MatDialogRef<DialogRegisterStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit() {
    this.registerStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      course: [''],
      centre: [''],
      nameParents: [''],
      telephone: [''],
      telephoneParents: ['']
    });

    this.getCoursesOfCentre();
    this.parentsOfCentre();
  }

  getCoursesOfCentre() {
    this.http.get('/centres/' + this.data.idCentre + '/courses').subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.courses.length; i++) {
          this.courses.push(resp.content.courses[i]);
        }
      }
    });
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

  register() {
    for (let i = 0; i < this.addParentsContainer.length; i++) {
      this.telephoneParents.push(this.addParentsContainer[i].telephone);
    }
    this.registerStudentForm['telephoneParents'] = this.telephoneParents;
    this.registerStudentForm['centre'] = this.data.idCentre;
    this.http.post('/students/register', this.registerStudentForm).subscribe((resp: any) => {
      if (resp.success) {
        this.toastr.success('', 'Alumno registrado correctamente' , {positionClass : 'toast-bottom-right'});
        this.addParentsContainer = [];
        this.telephoneParents = [];
        this.onNoClick(resp.content);
      } else {
        this.toastr.error(resp.error, 'Error' , {positionClass : 'toast-bottom-right'});
      }
    }, error => this.toastr.error('Hubo un error al intentar registrar al alumno', 'Error' , {positionClass : 'toast-bottom-right'})
  );
  }

  addParents() {

    if ((this.parents = this.parentsAux.filter(x => x.telephone === this.registerStudentForm['telephone'])).length > 0) {
      if (this.addParentsContainer.length < 2) {
        if (this.addParentsContainer.length === 0) {
          this.addParentsContainer.push({id: this.parents[0].id, name: this.parents[0].name, telephone: this.parents[0].telephone});
        } else {
          this.addParentsContainer.forEach((parent) => {
            if (parent.telephone !== this.registerStudentForm['telephone']) {
              this.addParentsContainer.push({id: this.parents[0].id, name: this.parents[0].name, telephone: this.parents[0].telephone});
            } else {
              this.toastr.error('No puede meter el mismo padre dos veces', 'Error' , {positionClass : 'toast-bottom-right'});
            }
          });
        }
      } else {
        this.toastr.error('No puede meter mas de dos padres', 'Error' , {positionClass : 'toast-bottom-right'});
      }
    } else {
      this.toastr.error('No se ha encontrado ningún padre con este teléfono', 'Error' , {positionClass : 'toast-bottom-right'});
    }
  }

  deleteParent(parent) {

    const index = this.addParentsContainer.indexOf(parent);
    this.addParentsContainer.splice(index, 1);

  }

  filterByTelephone() {

    const searchTerm = this.registerStudentForm['telephone'];

    // Search
    if ( searchTerm === '' ) {
      this.registerStudentForm['nameParents'] = '';
    } else {
      this.parents = this.parentsAux.filter((parent) => {

        if (parent.telephone === searchTerm) {
          this.registerStudentForm['nameParents'] = parent.name;
        }
      });
    }
  }

  onNoClick(student): void {
    this.dialogRef.close(student);
  }

}
