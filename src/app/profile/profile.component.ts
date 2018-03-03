import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;

  constructor(
      private router: ActivatedRoute,
      private userService: UserService
  ) { }

  ngOnInit() {

    this.router.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.userService.getUserById(this.id);

  }

}
