import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  token: any;

  constructor(private formBuilder: FormBuilder,
              private router: ActivatedRoute,
              private http: HttpUsingFormDataService) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.router.params.forEach((params: Params) => {
      this.token = params['token'];
    });

  }

  resetPassword() {
    const json = {
      'password': this.resetPasswordForm['password']
    };

    this.http.postRaw('/forgot_password/' + this.token, json).subscribe((resp: any) => {
      console.log(resp);
    });
  }



}
