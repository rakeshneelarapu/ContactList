import { Injectable } from '@angular/core';
import { Contact } from '../../contact';

@Injectable()
export class LoginService {
  isLoggedin: boolean = false;
  constructor() { }

  login(contact: Contact) {
    if (contact.userName === 'admin' && contact.password === 'admin') {
      this.isLoggedin = true;
      return true;
    } else {
      return false;
    }
  }
}
