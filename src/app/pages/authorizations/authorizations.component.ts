import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {DialogAddAuthorizationComponent} from '../dialog-add-authorization/dialog-add-authorization.component';

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.component.html',
  styleUrls: ['./authorizations.component.css']
})

export class AuthorizationsComponent implements OnInit {

  idAdministrator: any;
  idCentre: any;
  authorizations: any[] = [];
  authorizationsAux: any[] = [];
  monthSending: any;
  statusAuthorization: any;
  months =
      [{value: '1', text: 'Enero'},
      {value: '2', text: 'Febrero'},
      {value: '3', text: 'Marzo'},
      {value: '4', text: 'Abril'},
      {value: '5', text: 'Mayo'},
      {value: '6', text: 'Junio'},
      {value: '7', text: 'Julio'},
      {value: '8', text: 'Agosto'},
      {value: '9', text: 'Septiembre'},
      {value: '10', text: 'Octubre'},
      {value: '11', text: 'Noviembre'},
      {value: '12', text: 'Diciembre'}];

  status =
      [{value: 'En curso', text: 'En curso'},
      {value: 'Finalizadas', text: 'Finalizadas'}];

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
        this.authorizationsAux = this.authorizations;
        this.dataSource = new MatTableDataSource(this.authorizations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  addAuthorization() {
    this.dialog.open(DialogAddAuthorizationComponent, {
      data: {
        idCentre: this.idCentre
      }
    });
  }

  seeAuthorization(authorization) {

  }

  editLimitDate(authorization) {

  }

  searchAuthorizationBySubject(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  filterByMonth() {
    if (this.monthSending === 'all') {
      this.authorizations = this.authorizationsAux;
      this.dataSource = new MatTableDataSource(this.authorizations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.authorizations = this.authorizationsAux.filter((authorization) => {
        return new Date(authorization.sendingDate.date).getMonth() + 1 + '' === this.monthSending;
      });
      this.dataSource = new MatTableDataSource(this.authorizations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  filterByStatus () {
    if (this.statusAuthorization === 'all') {
      this.authorizations = this.authorizationsAux;
      this.dataSource = new MatTableDataSource(this.authorizations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    if (this.statusAuthorization === 'En curso') {
      this.authorizations = this.authorizationsAux.filter((authorization) => {
        return new Date <= new Date(authorization.limitDate.date);
      });
      this.dataSource = new MatTableDataSource(this.authorizations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    if (this.statusAuthorization === 'Finalizadas') {
      this.authorizations = this.authorizationsAux.filter((authorization) => {
        return new Date() > new Date(authorization.limitDate.date);
      });
      this.dataSource = new MatTableDataSource(this.authorizations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
