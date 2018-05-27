import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.component.html',
  styleUrls: ['./authorizations.component.css']
})

export class AuthorizationsComponent implements OnInit {

  idAdministrator: any;
  idCentre: any;
  authorizations: any[] = [];
  monthSending: any;
  statusAuthorization: any;
  months =
      [{value: '01', text: 'Enero'},
      {value: '02', text: 'Febrero'},
      {value: '03', text: 'Marzo'},
      {value: '04', text: 'Abril'},
      {value: '05', text: 'Mayo'},
      {value: '06', text: 'Junio'},
      {value: '07', text: 'Julio'},
      {value: '08', text: 'Agosto'},
      {value: '09', text: 'Septiembre'},
      {value: '10', text: 'Octubre'},
      {value: '11', text: 'Noviembre'},
      {value: '12', text: 'Diciembre'}];

  displayedColumns = ['subject', 'sendingDate', 'limitDate', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpUsingFormDataService, public dialog: MatDialog) { }

  ngOnInit() {
    const decodeToken = new JwtHelper().decodeToken(localStorage.getItem('token'));
    this.idAdministrator = decodeToken.id;
    this.getAdministrator();
  }

  getAdministrator() {
    this.http.get('/administrators/' + this.idAdministrator).subscribe((resp: any) => {
      if (resp.content) {
        this.idCentre = resp.content.centre.id;
        this.getAuthorizations(this.idCentre);
      }
    });
  }

  getAuthorizations(idCentre) {
    this.http.get('/authorizations/' + idCentre).subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.authorizations.length; i++) {
          this.authorizations.push(resp.content.authorizations[i]);
        }
        this.dataSource = new MatTableDataSource(this.authorizations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  addAuthorization() {

  }

  seeAuthorization(authorization) {

  }

  editLimitDate(authorization) {

  }

  searchAuthorizationBySubject() {

  }

  filterByMonth() {

  }

  filterByStatus () {

  }

}
