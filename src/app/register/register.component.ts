import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import {NgProgressService} from "ng2-progressbar";
import {NotifyService} from "../services/notify.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private ngProgress: NgProgressService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form.value.email);
    this.ngProgress.start();
    this.authService.register(form.value.name, form.value.email, form.value.password).then((userData) => {

      this.authService.logUserIn(userData);
      this.ngProgress.done();
    })
    .catch(error => {
      this.notify.notify(error.error, 'error');
      this.ngProgress.done();
    });
  }

}
