import { Component, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  inputs: ['contact'],
  outputs: ['updateContactEvent','deleteContactEvent']
})
export class ContactDetailComponent implements OnInit, OnChanges {
  contact: any;
  private editFirstName: boolean = false;
  private editLastName: boolean = false;
  private updateContactEvent = new EventEmitter();
  private deleteContactEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // this.editFirstName = false;
    this.editLastName = false;
  }

  onTitleClick() {
    this.editFirstName = true;
  }

  onLastNameClick() {
    this.editLastName = true;
  }

  updateContact() {
    this.updateContactEvent.emit(this.contact);
  }

  deleteContact() {
    this.deleteContactEvent.emit(this.contact);
  }

 
}
