import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-make-trans',
  templateUrl: './make-trans.component.html',
  styleUrls: ['./make-trans.component.css']
})
export class MakeTransComponent implements OnInit {
  constructor(private http: HttpClient) {

  }
    transactionForm = new FormGroup( {
    vendor: new FormControl('', Validators.required),
    transactionAmount: new FormControl('', Validators.compose([Validators.required, Validators.min(0)])),
    description: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    typeOfTransaction: new FormControl('', Validators.required)
  })

  readonly ROOT_URL = "http://localhost:3000/transactions/newTransaction"

  ngOnInit(): void {
  }

  onSubmit() {

    let typeconv;
    if (this.transactionForm.value.typeOfTransaction === "Deposit")
    {
      typeconv = "cr";
    }
    else {
      typeconv = "dr";
    }
    const transaction = {"location": this.transactionForm.value.vendor, "state": this.transactionForm.value.state, "typeOfTransaction": typeconv,
    "username": "Jumbo12", "description": this.transactionForm.value.description, "transactionAmount":this.transactionForm.value.transactionAmount};
    console.log(transaction);
    this.http.post(this.ROOT_URL, transaction).subscribe(
      (res) => {console.log(res), location.reload()},
      (err) => console.log(err)
    )

  }

  get transactionAmount() {
    return this.transactionForm.get('transactionAmount');
  }

}
