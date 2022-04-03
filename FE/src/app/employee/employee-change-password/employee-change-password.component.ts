import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PersonalInfoService} from '../../service/personal-info-service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.scss']
})
export class EmployeeChangePasswordComponent implements OnInit {
  formAccount: FormGroup;
  // accountId = '12';
  id: number;
  userId;
  oldPass;
  notification: string;
  notificationPassNew: string;

  constructor(
    private router: Router,
    private personalInfoService: PersonalInfoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;
    this.formAccount = this.fb.group({
      // oldPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      // newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      oldPassword: ['', [Validators.required, Validators.pattern(/^[-@.\/#&+\w\s]{3,15}$/)]],
      newPassword: ['', [Validators.required, Validators.pattern(/^[-@.\/#&+\w\s]{3,15}$/)]],
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
      this.personalInfoService.changePassword(this.userId, this.formAccount.value).subscribe(
        () => {
          this.toastr.success("Cập nhật thông tin cá nhân thành công!", "Thành công: ", {
            timeOut: 2500,
            extendedTimeOut: 1500
          });
          this.router.navigateByUrl("/employee/acc-detail");
        });
    } else {
      this.toastr.error("Mật khẩu không đúng, vui lòng nhập lại!", "Thất bại: ", {
        timeOut: 2500,
        extendedTimeOut: 1500
      });
    }
  }
}
