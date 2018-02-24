import 'rxjs/add/operator/toPromise'
import { Injectable } from '@angular/core'
import { CONFIG } from '../config/config'
import { Http } from '@angular/http'

@Injectable()
export class AuthService{

    constructor(
       private http: Http
    ){

    }

    register(name: string, email: string, password: string){
        return this.http.post(`${CONFIG.API_URL}/register`, { name: name, email: email, password: password })
                .toPromise()
                .then((response) => {
                    // console.log(response);
                    return response
                }, (error) => {
                    // console.log(error)
                    return error
                })
    }
}