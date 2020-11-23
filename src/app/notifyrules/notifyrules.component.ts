import { Component, Input, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notifyrules',
  templateUrl: './notifyrules.component.html',
  styleUrls: ['./notifyrules.component.css']
})
export class NotifyrulesComponent implements OnInit {
  @Input()  name: string;
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;

  vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }
  
  constructor(private http: HttpClient) {

  }
    NotificationsForm = new FormGroup( {
    Item: new FormControl('', Validators.required),
    Relation: new FormControl('', Validators.required),
    Amount: new FormControl('', Validators.required)
  });

    timePickerForm = new FormGroup ( {
      FromTime: new FormControl('', Validators.required),
      ToTime: new FormControl('', Validators.required)
    });

    statePickerForm = new FormGroup ( {
      StateSelect: new FormControl('', Validators.required),
    });
  
 
  readonly ROOT_URL = "http://localhost:3000/transactions/"

  ngOnInit(): void {
  }

  onSubmit() {
    const newRule = {"typeItem": this.NotificationsForm.value.Item, "Relation": this.NotificationsForm.value.Relation, "Amount":  this.NotificationsForm.value.Amount};
    this.http.post(this.ROOT_URL + "newRule", newRule).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
    location.reload();
  }

  onTimeSubmit() {
    console.log (this.timePickerForm.value);
    const newRule = {
      "fromTime" : this.timePickerForm.value.FromTime,
      "toTime" : this.timePickerForm.value.ToTime,
    }
    this.http.post(this.ROOT_URL + "newRuleTime", newRule).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
    location.reload();
  }

  onStateSubmit() {
    console.log(this.statePickerForm.value.StateSelect);
    const newRule = {
      "withinStateRule": this.statePickerForm.value.StateSelect
    }

    this.http.post(this.ROOT_URL + "newRuleState", newRule).subscribe(
      (res) => console.log(res),
      (err) => console.log("Error: " + err)
    )
    location.reload();
  }

  

  get transactionNewRule() {
    return this.NotificationsForm.get('Item');
  }
}
