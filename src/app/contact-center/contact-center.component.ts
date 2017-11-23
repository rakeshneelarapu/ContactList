import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact/contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-center',
  templateUrl: './contact-center.component.html',
  styleUrls: ['./contact-center.component.css']
})
export class ContactCenterComponent implements OnInit {
  contacts: Array<Contact>;
  selectedContact: Contact;
  loginuser: string;
  private hideContact: boolean = true;
  private isAdmin: boolean = false;
  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    let getUsername = JSON.parse(localStorage.getItem('currentUser'));
    this.loginuser = getUsername.firstName;
    if (getUsername.role === 'admin') {
      this.isAdmin = true;
      this.contactService.getContacts()
        .subscribe(resContactsData => this.contacts = resContactsData);
    } else {
      this.isAdmin = false;
      this.contactService.getContact(getUsername)
        .subscribe(resContactData => this.contacts = Array.of(resContactData));
    }
  }

  onSelectContact(contact: any) {
    this.selectedContact = contact;
    this.hideContact = true;
  }

  onSubmitAddContact(contact: Contact) {
    this.contactService.addContact(contact)
      .subscribe(resNewContact => {
        this.contacts.push(resNewContact);
        this.selectedContact = resNewContact;
        this.hideContact = true;
      });
  }

  newContact() {
    this.hideContact = false;
  }
  closeContactForm() {
    this.hideContact = true;
  }
  onUpdateContact(contact: any) {
    this.contactService.updateContact(contact)
      .subscribe(resUpdatedContact => contact = resUpdatedContact);
    this.selectedContact = null;
  }

  onDeleteContactEvent(contact: any) {
    const contactArray = this.contacts;
    this.contactService.deleteContact(contact)
      .subscribe(resDeletedContact => {
        for (let i = 0; i < contactArray.length; i++) {
          if (contactArray[i]._id === contact._id) {
            contactArray.splice(i, 1);
          }
        }
      });
    this.selectedContact = null;
  }
}
