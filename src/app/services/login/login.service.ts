import { Injectable } from '@angular/core';
import { Contact } from '../../contact';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  isLoggedin: boolean = false;
  private _postUrl = '/api/authenticate';
  constructor(private _http: Http) { }

  login(contact: Contact) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(contact), options)
      .map((response: Response) => {
        if (response.status === 200) {
          let userDetails = response.json();
          if (userDetails) {
            localStorage.setItem('currentUser', JSON.stringify(userDetails));
          }
          return userDetails;
        }
      })
      .catch(error => {
        let errMessage: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMessage = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMessage = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMessage);

      });
  }
}
