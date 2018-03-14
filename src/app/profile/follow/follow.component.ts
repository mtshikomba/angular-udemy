import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FollowService} from "../../services/follow.service";
import {NgProgressService} from "ng2-progressbar";
import {NotifyService} from "../../services/notify.service";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnChanges {

  @Input() currentProfileId;
  public isFollowing: boolean;
  public isLoading = true;

  constructor(private followService: FollowService, public ngProgress: NgProgressService,
              public notify: NotifyService) { }

  ngOnInit() {
      this.checkIfFollowing();
  }

  private checkIfFollowing() {
      this.followService.isFollowing(this.currentProfileId)
          .then(response => {
              this.isLoading = false;
              this.isFollowing = response;
          });
  }

// listen to when data for this component changes
  ngOnChanges(changes) {
    console.log(changes);
    this.checkIfFollowing();
  }

  follow() {
    this.isLoading = true;
    this.ngProgress.start();
    this.followService.follow(this.currentProfileId).then(user => {

      this.ngProgress.done();
      this.isFollowing = true;
      this.isLoading = false;
      this.notify.notify(`You are now following ${user.name}!`, 'success');
    });
  }

  unfollow() {
    this.isLoading = true;
    this.ngProgress.start();
    this.followService.unfollow(this.currentProfileId).then(user => {
      this.ngProgress.done();
      this.isFollowing = false;
      this.isLoading = false;
      this.notify.notify(`You unfollowed ${user.name}!`, 'success');
    });
  }

}
