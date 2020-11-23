import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface TransactionTable{
  Vendor: string;
  Amount: number;
  Type: string;
  Description: string;
  State: string;
}

@Component({
  selector: 'listTransactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css'],
})
export class ListTransactionsComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ['Date', 'Description', 'State', 'Amount', 'Balance After', 'Balance Before', 'Vendor', 'Rules Broken', 'Type'];
  constructor(private http: HttpClient) { 
    
  }
  readonly ROOT_URL = "http://localhost:3000/transactions/getTransactions/"
  ngOnInit(): void {
    this.http.get<any>(this.ROOT_URL + "Jumbo12").subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filteredData.reverse();

      console.log(this.dataSource);
    })
  }

}
