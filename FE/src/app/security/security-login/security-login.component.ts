import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../service/share.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-security-login',
  templateUrl: './security-login.component.html',
  styleUrls: ['./security-login.component.scss']
})
export class SecurityLoginComponent implements OnInit {
  formGroup: FormGroup;
  username: string;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: string;

  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private shareService: ShareService) {
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
        remember_me: ['']
      }
    );

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      data => {
        if (this.formGroup.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.authService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();
        this.toastr.success("Đăng nhập thành công!", "Thông báo", {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
      },
      err => {
        // // this.errorMessage = err.error.message;
        this.authService.isLoggedIn = false;
        this.toastr.error("Sai tên đăng nhập hoặc mật khẩu!", "Đăng nhập thất bại", {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
      }
    );
  }

}
