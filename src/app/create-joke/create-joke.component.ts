import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JokeService} from "../services/joke.service";
import { NgProgressService} from "ng2-progressbar"

@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css']
})
export class CreateJokeComponent implements OnInit {

  public jokeForm: FormGroup;


  constructor(private fb: FormBuilder, public jokeService: JokeService, public ngProgress: NgProgressService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {

    this.jokeForm = this.fb.group({
        title: ['', [
            Validators.required
        ]],
        content: ['', [
            Validators.required,
            Validators.minLength(5)
        ]],
    });

  }

  onSubmit() {
    this.ngProgress.start();
    this.jokeService.createJoke(this.jokeForm.value)
        .then(joke => {
          console.log(joke);
          this.ngProgress.done();
          this.jokeForm.reset();
        });
  }

}
