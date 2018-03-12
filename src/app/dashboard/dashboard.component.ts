import { Component, OnInit } from '@angular/core';
import {JokeService} from "../services/joke.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private data;
  public isLoading = true;

  constructor(
      private jokeService: JokeService
  ) { }

  ngOnInit() {
      this.getJokes();
  }


  getNextJokes(){
    this.getJokes(this.data.next_page_url);
  }

  getPrevJokes(){
      this.getJokes(this.data.prev_page_url);
  }


  getJokes(endPoint = null) {
      this.jokeService.getJokes(endPoint)
          .then(response => {
            console.log(response);
              this.data = response;
              this.isLoading = false;
          });
  }
}
