import { Component, OnInit, EventEmitter } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  inputs: ['contacts'],
  outputs: ['SelectContact']
})
export class ContactListComponent implements OnInit {
  public SelectContact = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSelect(cont: Contact) {
    this.SelectContact.emit(cont);
  }

}
