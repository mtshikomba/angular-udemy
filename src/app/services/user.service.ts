 import {EventEmitter, Injectable} from '@angular/core';
 import {AuthService} from "./auth.service";
 import {Http, Headers, RequestOptions} from "@angular/http";
 import {CONFIG} from "../config/config";
 import {User} from "../classes/user";

@Injectable()
export class UserService {

  private headers: Headers;
  public userProfileUpdated: EventEmitter<User>;

  constructor(
      private authService: AuthService,
      private http: Http,
  ) {

      this.userProfileUpdated = new EventEmitter();
    this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`});

  }

  getUserById(id: number): Promise<User>{
      if (id === this.authService.getAuthUserId()){
          return Promise.resolve(this.authService.getAuthUser());
      }

      let option = new RequestOptions({ headers: this.headers});
      //  pass the token to the api as you request data
      return this.http.get(`${CONFIG.API_URL}/user/${id}`, option)
          .toPromise()
          .then((response) => {
            console.log(response.json());
            return response.json();
          })
          .catch((error) => {
            console.log(error);
            // return error;
          });
  }

  updateProfile(name: string, email: string): Promise<User>{

      let option = new RequestOptions({ headers: this.headers});
      let data = { name: name, email: email };
      return this.http.put(`${CONFIG.API_URL}/user/update`, data, option )
          .toPromise()
          .then((response) => {
              let user = response.json().data;

              localStorage.setItem('user', JSON.stringify(user));
              this.userProfileUpdated.emit(user);
              return user;
          });
  }

}
