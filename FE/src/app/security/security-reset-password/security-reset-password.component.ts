import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-security-reset-password',
  templateUrl: './security-reset-password.component.html',
  styleUrls: ['./security-reset-password.component.scss']
})
export class SecurityResetPasswordComponent implements OnInit {

  formGroup:FormGroup;
  isSubmited = false;
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private toastr:ToastrService,
              private router:Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username:['']
    })
  }

  onSubmit() {
    this.isSubmited=true;
    this.authService.resetPassword(this.formGroup.value.username).subscribe(
      data => {
        this.toastr.success("Email đã được gửi!","Thành công",{
          timeOut: 2000,
          extendedTimeOut:1000
        });
        this.router.navigateByUrl("/verify-reset-password");
      },
      err => {
        this.toastr.error("Sai tên tài khoản hoặc tên tài khoản chưa được đăng ký!","Gửi email thất bại ",{
          timeOut: 3000,
          extendedTimeOut:1500
        });
      }
    );
  }

  load() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
  }
}
