import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { LoginService } from '../services/login/login.service';
import { Contact } from '../contact';
import { error } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contact: Contact = new Contact();
  loading: boolean = false;
  loggedInUser: string;
  constructor(private loginService: LoginService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.loginService.logout();
  }

  login() {
    this.loading = true;
    this.loginService.login(this.contact)
      .subscribe(
      response => {
        console.log(response);
        this.loggedInUser = response.userName;
        this.router.navigate(['/contacts']);
      },
      error => {
        console.log(error);
        this.alertService.error(error);
        this.loading = false;
      });
  }
};
