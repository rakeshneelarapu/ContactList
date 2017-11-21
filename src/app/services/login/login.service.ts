import { Injectable } from '@angular/core';
import { Contact } from '../../contact';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class LoginService {
  isLoggedin: boolean = false;
  private _postUrl = '/api/authenticate';
  constructor(private _http: Http) { }

  login(contact: Contact) {
    // if (contact.userName === 'admin' && contact.password === 'admin') {
    //   this.isLoggedin = true;
    //   return true;
    // } else {
    //   return false;
    // }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(contact), options)
      .map((resp: Response) => {
        console.log('RESP' + resp);
        // login successful if there's a jwt token in the response
        // let user = resp.json();
        // if (user) {
        //   // store user details and jwt token in local storage to keep user logged in between page refreshes
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        // }
      });
  }
}
