import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Contact } from '../../contact';

@Injectable()
export class RegistrationService {
  contact: Contact = new Contact();
  private _postUrl = '/api/registerContact';
  constructor(private _http: Http) { }

  registerUser(contact: Contact) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(contact), options)
      .map((response: Response) => response.json());
  }
}
