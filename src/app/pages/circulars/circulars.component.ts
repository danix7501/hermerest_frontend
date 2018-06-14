import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {JwtHelper} from 'angular2-jwt';
import {DialogAddCircularComponent} from '../dialog-add-circular/dialog-add-circular.component';

@Component({
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.css']
})
export class CircularsComponent implements OnInit {

  idAdministrator: any;
  idCentre: any;
  circulars: any[] = [];
  circularsAux: any[] = [];
  monthSending: any;

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

  displayedColumns = ['subject', 'sendingDate', 'actions'];
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
        this.getCirculars(this.idCentre);
      }
    });
  }

  getCirculars(idCentre) {
    this.http.get('/centres/' + idCentre + '/circulars').subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.circulars.length; i++) {
          this.circulars.push(resp.content.circulars[i]);
        }
        this.circularsAux = this.circulars;
        this.dataSource = new MatTableDataSource(this.circulars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  addCircular() {
    this.dialog.open(DialogAddCircularComponent, {
      maxHeight: '400px',
      data: {
        idCentre: this.idCentre
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp !== 'cancel') {
        this.circulars.push(resp);
        this.dataSource = new MatTableDataSource(this.circulars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  seeCircular() {
  }


  searchCircularBySubject(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  filterByMonth() {
    if (this.monthSending === 'all') {
      this.circulars = this.circularsAux;
      this.dataSource = new MatTableDataSource(this.circulars);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.circulars = this.circularsAux.filter((circular) => {
        return new Date(circular.sendingDate.date).getMonth() + 1 + '' === this.monthSending;
      });
      this.dataSource = new MatTableDataSource(this.circulars);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
