import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {

  }
  loginForm = new FormGroup( {
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  readonly ROOT_URL = "http://localhost:3000/users/login"

  ngOnInit(): void {
  }

  onSubmit() {
    const user = {"username": this.loginForm.value.username, "password": this.loginForm.value.password};
    this.http.post(this.ROOT_URL, user).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }
}
