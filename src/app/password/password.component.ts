import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from 'app/services/login/login.service';
import { Router } from '@angular/router';
import { ContactService } from 'app/services/contact/contact.service';
function comparePassword(c: AbstractControl): { [key: string]: boolean } | null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('retypepass');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { 'mismatchedPassword': true };
}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  userObj: any;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private contactService: ContactService) { }

  oldpassword = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$')]);
  retypepass = new FormControl('', [Validators.required]);
  ngOnInit() {
    this.userObj = localStorage.getItem('currentUser');
    this.passwordForm = this.fb.group({
      oldpassword: this.oldpassword,
      passwordGroup: this.fb.group({
        password: this.password,
        retypepass: this.retypepass,
      }, { validator: comparePassword })
    });
  }

  updatePassword(formdata: any): void {
    if (this.passwordForm.dirty && this.passwordForm.valid) {
      let theForm = this.passwordForm.value;
      const thePass = this.passwordForm.value.passwordGroup.password;
      theForm.password = thePass;
      delete theForm.passwordGroup;
      console.log('start');
      this.contactService.updatePassword(this.userObj, theForm)
        .subscribe(data => {
          if (data.success === false) {
            if (data.errcode) {
              this.loginService.logout();
              this.router.navigate(['login']);
            }
            // this.toastr.error(data.message);
            console.log(data.message);
          } else {
            // this.toastr.success(data.message);
            console.log(data.message);
          }
          this.passwordForm.reset();
        });
    }
  }

}
