import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form.value.email);
    this.authService.register(form.value.name, form.value.email, form.value.password).then((userData) => {

        this.authService.logUserIn(userData);

      console.log(userData);
    }, (error) => {
      console.log(error);
    });
  }

}
