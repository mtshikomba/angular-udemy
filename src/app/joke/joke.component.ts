import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl, Validators} from "@angular/forms";
import {JokeService} from "../services/joke.service";
import {NgProgressService} from "ng2-progressbar";
import {NotifyService} from "../services/notify.service";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {
  @Input() joke;
  public editing = false;
  title = new FormControl;
  content = new FormControl;

  constructor(
      private authService: AuthService,
      private jokeService: JokeService,
      private ngProgress: NgProgressService,
      private notify: NotifyService
  ) { }

  ngOnInit() {
      this.title = new FormControl(this.joke.title, Validators.required);
      this.content = new FormControl(this.joke.joke, Validators.required);
  }

  canModify(): boolean{
      return this.joke.user.id === this.authService.getAuthUserId();
  }

  edit(){
    this.editing = true;
  }

  updateJoke(){
    this.ngProgress.start();
    this.jokeService.updateJoke(this.joke.id, {
      title: this.title.value, content: this.content.value

    }).then(response => {
      // console.log(response);
      this.joke = response;
      this.editing = false;
      this.ngProgress.done();
      this.notify.notify('Joke Successfully Updated!', 'success');
    });
  }


}
