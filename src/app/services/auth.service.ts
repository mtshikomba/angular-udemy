import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';
import { Http } from '@angular/http';
import { Router} from "@angular/router";
import {UserdData} from "../classes/UserData";
import {NotifyService} from "./notify.service";

@Injectable()
export class AuthService{

    constructor(
       private http: Http,
       private router: Router,
       private notifyService: NotifyService,
    ){

    }

    getAuthUser(){
           return JSON.parse(localStorage.getItem('user'));
    }

    getAuthUserId(){
        return JSON.parse(localStorage.getItem('user')).id;
    }

    getToken(): string{
        return localStorage.getItem('token');
    }

    register(name: string, email: string, password: string): Promise<UserdData>{
        return this.http.post(`${CONFIG.API_URL}/register`, { name: name, email: email, password: password })
                .toPromise()
                .then((response) => {
                    let token = response.json().token;
                    let user = response.json().user.data;
                    let userData = new UserdData(token, user);

                    return userData;
                })
                .catch(error => {
                    return Promise.reject(error.json());
                });
    }

    login(email: string, password: string): Promise<UserdData>{
        return this.http.post(`${CONFIG.API_URL}/authenticate`, { email: email, password: password })
               .toPromise()
               .then((response) => {

                    let token = response.json().token;
                    let user = response.json().user.data;
                    let userData = new UserdData(token, user);

                    return userData;
               })
            .catch(error => {
                return Promise.reject(error.json());
            })

    }

    logUserIn(userData: UserdData): void{
        localStorage.setItem('token', userData.token);

        localStorage.setItem('user', JSON.stringify(userData.user));

        this.notifyService.notify('Successfully logged in.', 'success');

        this.router.navigate(['dashboard']);
    }

    isLoggedIn(): boolean{
        let token = localStorage.getItem('token');
        let user =  localStorage.getItem('user');

        // user is authenticated
        if ( token && user ) {
            return true;
        }
        // not authenticated
        return false;
    }

    logout() {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            this.router.navigate(['auth/login']);
    }
}