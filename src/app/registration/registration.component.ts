import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration/registration.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  contacts: Contact = new Contact();
  userRole: string = 'User';
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private registerService: RegistrationService, private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      address: this.fb.group({
        addressLine1: new FormControl('', [Validators.required]),
        addressLine2: new FormControl('', []),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        pincode: new FormControl('', [Validators.required])
      })
    });
  }

  onSubmitUser(contact: Contact) {
    this.registerService.registerUser(this.registrationForm.value)
      .subscribe(registeredContact => {
        console.log(registeredContact);
        this.alertService.success('Registration Successful', true);
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.error(error);
      });
    this.registrationForm.reset();
  }
}
