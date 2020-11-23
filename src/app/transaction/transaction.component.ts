import { Component, NgModule, OnInit } from '@angular/core';
import {ListTransactionsComponent} from '../list-transactions/list-transactions.component'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})


export class TransactionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
