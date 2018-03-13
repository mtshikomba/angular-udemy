import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import {NgProgressService} from "ng2-progressbar";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  public jokes;
  public id;
  public isLoading = true;

  constructor(private userService: UserService, private router: ActivatedRoute, private ngProgress: NgProgressService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = +params['id'];
        this.getUserWall();
    });
  }

  getUserWall() {
    this.ngProgress.start();
    this.userService.getUserWall(this.id)
        .then(response => {
            this.jokes = response;
          this.isLoading = false;
          this.ngProgress.done();
        });
  }

  jokeDeleted(jokeId){
    let joke = this.jokes.find((j) => {
        return j.id  === jokeId;
      });

    let jokeIndex = this.jokes.indexOf(joke);

    this.jokes.splice(jokeIndex, 1);
  }

}
