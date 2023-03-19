import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from "@angular/http";
import {NotifyService} from "./notify.service";
import {CONFIG} from "../config/config";
import {AuthService} from "./auth.service";
import {User} from "../classes/user"; ( CONFIG)


@Injectable()
export class FollowService {

    private headers: Headers;

  constructor(private http: Http,
              private notify: NotifyService,
              private authService: AuthService
              ) {
    this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`});
  }

  isFollowing(id: number): Promise<boolean>{
    let body = { user_to_check_if_is_following_id: id};
    let url = `${CONFIG.API_URL}/users/${this.authService.getAuthUserId()}/is-following-this-user/${id}`;
    let options = new RequestOptions({ headers: this.headers});

    return this.http.post(url, body, options)
        .toPromise()
        .then(response => {
            return response.json().data.following;
        });
  }


  follow(id: number): Promise<User> {
        let body = { user_to_follow_id: id};
        let url = `${CONFIG.API_URL}/users/${this.authService.getAuthUserId()}/follow-this-user/${id}`;
        let options = new RequestOptions({ headers: this.headers});

        return this.http.post(url, body, options)
            .toPromise()
            .then(response => {
                return response.json().data;
            });
    }

    unfollow(id: number): Promise<User> {
        let body = { user_to_unfollow_id: id};
        let url = `${CONFIG.API_URL}/users/${this.authService.getAuthUserId()}/unfollow-this-user/${id}`;
        let options = new RequestOptions({ headers: this.headers});

        return this.http.post(url, body, options)
            .toPromise()
            .then(response => {
                return response.json().data;
            });
    }
}
