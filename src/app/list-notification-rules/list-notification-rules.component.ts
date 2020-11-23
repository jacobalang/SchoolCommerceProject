import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list-notification-rules',
  templateUrl: './list-notification-rules.component.html',
  styleUrls: ['./list-notification-rules.component.scss']
})
export class ListNotificationRulesComponent implements OnInit {

  constructor(private http: HttpClient) { }
  readonly HARD_CODED_URL = "http://localhost:3000/users/getNotificationRules/Jumbo12"
  readonly HARD_CODED_REMOVE_URL = "http://localhost:3000/users/removeNotificationRule/Jumbo12"
  
  ngOnInit(){
    this.http.get(this.HARD_CODED_URL).subscribe(
      (res) => this.pushItems(res),
      (err) => console.log("Error: " + err)
    )
  }

  pushItems(res)
  {
    res.notificationRulesRelations.map(a => this.parseItemsRelations(a, this.notficationList));
    this.parseItemsState(res.notificationRulesState,this.notficationList);
    this.parseItemsTime(res.notificationRulesTimes, this.notficationList);
  }

  parseItemsState(obj, list)
  {
    let a = {
      id: 1,
      Type: "State",
      Relation: "Within",
      Amount: obj
    }
    list.push(a);
  }

  parseItemsRelations(obj, list)
  {
    let a = {
      id: 1,
      Type: obj.typeItem,
      Relation: obj.overUnderSame,
      Amount: obj.transAmount
    }
    list.push(a);
  }

  parseItemsTime(obj, list)
  {
    let timeString = '';
    if (obj.fromTime != undefined)
    {
      timeString = obj.fromTime + " - " + obj.toTime;
    }
    let a = {
      id: 1,
      Type: "Time",
      Relation: "Within",
      Amount: timeString
    }
    list.push(a);
  }
  
  editField: string;
  notficationList: Array<any> = [

  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.notficationList[id][property] = editField;
  }

  remove(id: any) {
    const obj= this.notficationList[id]
    let body = {
  
    }
    if (obj.Type === "Withdrawal" || obj.Type === "Deposit")
    {
      body = {
        amount : this.notficationList[id].Amount,
        typeItem: this.notficationList[id].Type,
        relation: this.notficationList[id].Relation
      }
    }
    else if (obj.Type === "State")
    {
      body = {
        typeItem : "State",
        amount: obj.Amount
      }
    }
    else if (obj.Type === "Time")
    {
      let firststring = obj.Amount.substr(0,4);
      let secondstring = obj.Amount.substr(8,12);
      let combined = {
        fromTime: firststring, toTime: secondstring
      }
      body = {
        typeItem : "Time",
        amount: combined
      }
    }
    

    this.http.put(this.HARD_CODED_REMOVE_URL, body).subscribe(
      (res) => {console.log(res); this.notficationList.splice(id, 1);},
      (err) => console.log("Error: " + err)
    )

  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
