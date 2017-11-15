import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { LoginService } from '../services/login/login.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contact: Contact = new Contact();
  loading: boolean = false;
  constructor(private loginService: LoginService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    if (this.loginService.login(this.contact)) {
      this.router.navigate(['/contacts']);
    } else {
      this.alertService.error('UserName or password is incorrect');
      this.loading = false;
    }
  }
}
