import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})



export class NotificationsComponent implements OnInit {
  readonly ROOT_URL = "http://localhost:3000/users/getNotificationRules/"
  readonly HARD_CODED_NAME = "Jumbo12"
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   
  }

  onVoted(agreed: boolean) {
    this.ngOnInit;
  }
  title = 'dynamic-mat-table';
  //fetch table cols
  tableCols = ['Date', 'Message', 'amount', 'Balance'];
  //fetch table contents
  tableData = [
    {
      Date: '20-10-02',
      Message: 'Deposit Made',
      amount: '$+200.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-04',
      Message: 'Unexpected Out of State Transaction',
      amount: '$-20.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-06',
      Message: 'Transaction made balance fall below $200',
      amount: '$-10.00',
      Balance: '$190.00',
    },
    {
      Date: '20-10-02',
      Message: 'Deposit Made',
      amount: '$+200.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-04',
      Message: 'Unexpected Out of State Transaction',
      amount: '$-20.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-06',
      Message: 'Transaction made balance fall below $200',
      amount: '$-10.00',
      Balance: '$190.00',
    },
    {
      Date: '20-10-02',
      Message: 'Deposit Made',
      amount: '$+200.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-04',
      Message: 'Unexpected Out of State Transaction',
      amount: '$-20.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-06',
      Message: 'Transaction made balance fall below $200',
      amount: '$-10.00',
      Balance: '$190.00',
    },
  ];
}
