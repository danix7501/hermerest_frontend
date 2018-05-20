import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  nameStudent: any;
  surnameStudent: any;
  courseStudent: any;

  parents: any[] = [];

  @Input() idStudent: any;
  @Output('update') change = new EventEmitter();


  constructor(private http: HttpUsingFormDataService) { }

  ngOnInit() {
    this.getStundent();
    this.getParentStudent();
  }

  getStundent() {
    this.http.get('/students/' +  this.idStudent).subscribe((resp: any) => {
      console.log(resp);
      this.nameStudent = resp.content.name;
      this.surnameStudent = resp.content.surname;
      this.courseStudent = resp.content.course.name;
    });
  }

  getParentStudent() {
    this.http.get('/students/' +  this.idStudent + '/parents').subscribe((resp: any) => {
      console.log(resp.content.parents);
      if (resp.content){
        for (let i = 0; i < resp.content.parents.length; i++) {
          this.parents.push(resp.content.parents[i]);
        }
      }
    });
  }

  back() {
    this.change.emit(2);
  }

}
