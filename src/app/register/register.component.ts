import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  re = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$"
  constructor(private http: HttpClient) {

  }
  registerForm = new FormGroup( {
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.pattern(this.re), Validators.required])),
  })

  readonly ROOT_URL = "http://localhost:3000/users/signup"

  ngOnInit(): void {
  }

  onSubmit() {
    
    const user = {"username": this.registerForm.value.username, "password": this.registerForm.value.password};
    this.http.post(this.ROOT_URL, user).subscribe(
      (res) => console.log(res), 
      (err) => console.log("Error" + err) //Errors implies connection issue with backend - An unability to create a user do to a pre-existing username will not be an error.
    )
  }

  get password() {
    return this.registerForm.get('password');
  }

}

