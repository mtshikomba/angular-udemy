import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service"
import {NotifyService} from "../services/notify.service";
import {NgProgressService} from "ng2-progressbar";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
      public authService: AuthService,
      private notifyService: NotifyService,
      public ngProgress: NgProgressService
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.ngProgress.start();
    this.authService.login(form.value.email, form.value.password)
        .then((userData) => {
            this.ngProgress.done();
            this.authService.logUserIn(userData);
        })
        .catch(error => {
          this.ngProgress.done();
          this.notifyService.notify('Error, Invalid Credentials, Please Try Again!', 'error');
        });
  }

}
