import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Contact } from 'app/contact';


@Injectable()
export class ContactService {
  private _getUrl = '/api/contacts';
  private _getContactUrl = '/api/contacts/';
  private _postUrl = '/api/contact';
  private _putUrl = '/api/contact/';
  private _deleteUrl = '/api/contact/';
  private _updatePassword = '/api/updatePassword/';

  constructor(private http: Http) { }

  getContacts() {
    return this.http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  getContact(contact: Contact) {
    return this.http.get(this._getContactUrl + contact._id)
      .map((response: Response) => response.json());
  }

  addContact(contact: Contact) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this._postUrl, JSON.stringify(contact), options)
      .map((response: Response) => response.json());
  }

  updateContact(contact: Contact) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this._putUrl + contact._id, JSON.stringify(contact), options)
      .map((response: Response) => response.json());
  }

  deleteContact(contact: Contact) {
    return this.http.delete(this._deleteUrl + contact._id)
      .map((response: Response) => response.json());
  }

  updatePassword(contact, oUser) {
    console.log('1');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `${this.jwtToken}`);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this._updatePassword + JSON.parse(contact)._id, JSON.stringify(oUser), options)
      .map((response: Response) => response.json());
  }
}
