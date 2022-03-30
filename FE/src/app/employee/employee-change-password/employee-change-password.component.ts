import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PersonalInfoService} from '../../service/personal-info-service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.scss']
})
export class EmployeeChangePasswordComponent implements OnInit {
  formAccount: FormGroup;
  accountId = '10';
  userId;
  private oldPass;
  notification: string;
  notificationPassNew: string;

  constructor(
    private router: Router,
    private personalInfoService: PersonalInfoService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    // this.currentUser = this.token.getUser();
    // this.userId = this.currentUser.getAccount().getId();
    this.userId = this.accountId;
    this.formAccount = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
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

  updatePassword() {
    if (this.formAccount.valid) {
      this.personalInfoService.changePassword(this.userId , this.formAccount.value).subscribe(data => {
        if (data.message === "1") {
          // this.notification = "Sai mật khẩu, vui lòng nhập lại";
          this.toast.warning("Sai mật khẩu, vui lòng nhập lại", "Thông báo");
        } else {
          // this.ngOnInit();
          this.toast.success("Đổi mật khẩu thành công", "Thông báo");
          this.router.navigateByUrl("/employee/acc-detail");
        }
      });
    }
  }

}
