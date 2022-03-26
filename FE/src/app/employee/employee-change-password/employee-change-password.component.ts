import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PersonalInfoService} from '../../service/personal-info-service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.scss']
})
export class EmployeeChangePasswordComponent implements OnInit {
  formAccount: FormGroup;
  accountId = '10';
  userId;

  constructor(
    private router: Router,
    private personalInfoService: PersonalInfoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.currentUser = this.token.getUser();
    this.userId = this.accountId;
    this.formAccount = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      confirmNewPassword: ['', [Validators.required]]
    }, {validators: this.comparePassword});
  }

  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmNewPassword) ? null : {
      passwordNotMatch: true
    };
  }

}
