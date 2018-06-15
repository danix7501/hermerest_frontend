import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpUsingFormDataService} from '../../services/http/http.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {JwtHelper} from 'angular2-jwt';
import {DialogAddPollComponent} from '../dialog-add-poll/dialog-add-poll.component';
import {DialogSeePollComponent} from '../dialog-see-poll/dialog-see-poll.component';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  idAdministrator: any;
  idCentre: any;
  polls: any[] = [];
  pollsAux: any[] = [];
  monthSending: any;
  statusPoll: any;
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
        this.getPolls(this.idCentre);
      }
    });
  }

  getPolls(idCentre) {
    this.http.get('/centres/' + idCentre + '/polls').subscribe((resp: any) => {
      if (resp.content) {
        for (let i = 0; i < resp.content.polls.length; i++) {
          this.polls.push(resp.content.polls[i]);
        }
        this.pollsAux = this.polls;
        this.dataSource = new MatTableDataSource(this.polls);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  addPoll() {
    this.dialog.open(DialogAddPollComponent, {
      maxHeight: '450px',
      data: {
        idCentre: this.idCentre
      }
    }).afterClosed().subscribe((resp: any) => {
      if (resp && resp !== 'cancel') {
        this.polls.push(resp);
        this.dataSource = new MatTableDataSource(this.polls);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  seePoll(poll) {
    this.dialog.open(DialogSeePollComponent, {
      width: '700px',
      minHeight: '450px',
      data: {
        poll: poll
      }
    });
  }

  editLimitDate(poll) {

  }

  searchPollBySubject(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  filterByMonth() {
    if (this.monthSending === 'all') {
      this.polls = this.pollsAux;
      this.dataSource = new MatTableDataSource(this.polls);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.polls = this.pollsAux.filter((poll) => {
        return new Date(poll.sendingDate.date).getMonth() + 1 + '' === this.monthSending;
      });
      this.dataSource = new MatTableDataSource(this.polls);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  filterByStatus () {
    if (this.statusPoll === 'all') {
      this.polls = this.pollsAux;
      this.dataSource = new MatTableDataSource(this.polls);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    if (this.statusPoll === 'En curso') {
      this.polls = this.pollsAux.filter((poll) => {
        return new Date <= new Date(poll.limitDate.date);
      });
      this.dataSource = new MatTableDataSource(this.polls);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    if (this.statusPoll === 'Finalizadas') {
      this.polls = this.pollsAux.filter((poll) => {
        return new Date() > new Date(poll.limitDate.date);
      });
      this.dataSource = new MatTableDataSource(this.polls);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
