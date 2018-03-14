import { Component, OnInit } from '@angular/core';
import {Profile} from "selenium-webdriver/firefox";
import {User} from "../../classes/user";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {NgProgressService} from "ng2-progressbar";
import {NotifyService} from "../../services/notify.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService, private userService: UserService,
              private ngProgress: NgProgressService, public notifyService: NotifyService) { }

  ngOnInit() {
    this.user = this.authService.getAuthUser();
  }

  editProfile() {

    this.ngProgress.start()
    this.userService.updateProfile(this.user.name, this.user.email)
        .then((data) => {
          this.ngProgress.done();
          this.notifyService.notify('Profile Successfully Updated!', 'success');
        });

  }

}
