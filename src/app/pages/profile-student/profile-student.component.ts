import {Component, Input, OnInit} from '@angular/core';
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

  @Input() idStudent: any;

  constructor(private http: HttpUsingFormDataService) { }

  ngOnInit() {
    this.getStundent();
  }

  getStundent() {
    this.http.get('/students/' +  this.idStudent).subscribe((resp: any) => {
      console.log(resp);
      this.nameStudent = resp.content.name;
      this.surnameStudent = resp.content.surname;
      this.courseStudent = resp.content.course.name;
    });
  }

}
