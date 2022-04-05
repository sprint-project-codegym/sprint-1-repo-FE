import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  @ViewChild('user') user: ElementRef;

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
    // Username không được trống, tối thiểu 4 ký tự,tối đa 30 ký tự, không chứa ký tự đặc biệt(trừ . và @) và khoảng trắng
    // Mật khẩu không được trống, tối thiểu 3 ký tự,tối đa 15 ký tự
    this.formGroup = this.formBuild.group({
        username: ['', [Validators.required, Validators.pattern('^\\S[a-zA-Z0-9@.]{3,29}$')]],
        password: ['', [Validators.required, Validators.pattern('^[-@.\\/#&+\\w\\s]{3,15}$')]],
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

  validation_messages = {
    'user_pass': [
      {type: 'required', message: 'Trường này không được để trống!'},
      {type: 'pattern', message: 'Trường này không đúng định dạng!'},
    ]
  };

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
        this.authService.isLoggedIn = false;
        this.toastr.error("Sai tên đăng nhập hoặc mật khẩu!", "Đăng nhập thất bại", {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
        this.user.nativeElement.focus();
      }
    );
  }

}
