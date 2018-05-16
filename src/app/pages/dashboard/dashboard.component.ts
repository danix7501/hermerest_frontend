import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('rol') !== 'administrador') {
      this.router.navigate(['/login']);
    }

  }

  logout() {

    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

}
