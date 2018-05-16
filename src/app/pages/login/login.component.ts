import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpUsingFormDataService,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    this.http.post('/login', this.loginForm).subscribe((resp: any) => {
      if (resp.success) {

        const token = resp.content;
        const decodeToken = new JwtHelper().decodeToken(token);

        localStorage.setItem('rol', decodeToken.rol);
        localStorage.setItem('token', token);

        if (localStorage.getItem('rol') === 'administrador') {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }


}


