import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-security-verify-reset-password',
  templateUrl: './security-verify-reset-password.component.html',
  styleUrls: ['./security-verify-reset-password.component.scss']
})
export class SecurityVerifyResetPasswordComponent implements OnInit {
  isSuccessful = true;
  isSendMail: boolean;
  isSubmited: true;

  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      repeatNewPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
    this.route.queryParams.subscribe(params => {
      let code = params['code'];
      if (code == null) {
        this.isSendMail = false;
      } else {
        this.isSendMail = true;
        this.isSuccessful = false;
        this.authService.verifyPassword(code).subscribe(
          data => {
            this.isSuccessful = (data.message === 'accepted');
          },
          err => {
            this.isSuccessful = false;
          }
        );
      }
    });
  };
  code:string;
  onSubmitt() {
    if (this.formGroup.value.newPassword === this.formGroup.value.repeatNewPassword) {
      this.route.queryParams.subscribe(params => {
        this.code = params['code'];
      });
      this.authService.doResetPassword(this.formGroup.value.newPassword,this.code).subscribe(data =>{
        this.toastr.success('Mật khẩu đã được thay đổi!',"Thành công");
        this.router.navigateByUrl("/")
      })
    }else {
      this.toastr.error("Trường nhập lại mật khẩu và mật khẩu không giống nhau!","Lỗi: ",{
        timeOut: 3500,
        extendedTimeOut:1500
      })
    }
  }

  validation_messages = {
    'password': [
      {type: 'required', message: 'Trường này không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu tối thiểu 3 ký tự!'},
      {type: 'maxlength', message: 'Mật khẩu tối đa 30 ký tự!'},
    ]
  };
}
