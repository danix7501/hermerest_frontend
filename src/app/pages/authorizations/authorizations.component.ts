import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {DialogAddAuthorizationComponent} from '../dialog-add-authorization/dialog-add-authorization.component';
import {DialogSeeAuthorizationComponent} from '../dialog-see-authorization/dialog-see-authorization.component';
import {DialogEditLimitdateComponent} from '../dialog-edit-limitdate/dialog-edit-limitdate.component';

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
  currentDate: any;
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
    this.currentDate = new Date();
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
    this.http.get('/centres/' + idCentre + '/authorizations').subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.authorizations.length; i++) {
          resp.content.authorizations[i]['formatLimitDate'] = new Date(resp.content.authorizations[i].limitDate.date);
          this.authorizations.push(resp.content.authorizations[i]);
        }
        console.log(this.authorizations);
        this.authorizationsAux = this.authorizations;
        this.dataSource = new MatTableDataSource(this.authorizations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  addAuthorization() {
    this.dialog.open(DialogAddAuthorizationComponent, {
      maxHeight: '450px',
      data: {
        idCentre: this.idCentre
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp !== 'cancel') {
        this.authorizations.push(resp);
        this.dataSource = new MatTableDataSource(this.authorizations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  seeAuthorization(authorization) {
    this.dialog.open(DialogSeeAuthorizationComponent, {
      width: '600px',
      minHeight: '450px',
      data: {
        authorization: authorization
      }
    });
  }

  editLimitDate(authorization) {
    this.dialog.open(DialogEditLimitdateComponent, {
      data: {
        authorization: authorization,
        type: 'authorization'
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp !== 'cancel') {
        for (let i = 0; i < this.authorizations.length; i++) {
          if (this.authorizations[i].id === resp.id) {
            this.authorizations[i].limitDate = resp.limitDate;
          }
        }
        this.dataSource = new MatTableDataSource(this.authorizations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
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
