import { Component, OnInit } from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  idAdministrator: any;

  constructor(private http: HttpUsingFormDataService) { }

  ngOnInit() {

    this.idAdministrator = new JwtHelper().decodeToken(localStorage.getItem('token')).id;
    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      console.log(1, resp);
      this.http.get('/centres/' + resp.content.centre.id + '/clasess').subscribe((resp2: any) => {
        console.log(2, resp2);
      });
    });

  }

}
