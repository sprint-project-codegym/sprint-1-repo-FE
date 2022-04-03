import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonalInfoService} from '../../service/personal-info-service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-employee-account-detail',
  templateUrl: './employee-account-detail.component.html',
  styleUrls: ['./employee-account-detail.component.scss']
})
export class EmployeeAccountDetailComponent implements OnInit {
  formUpdateEmployee: FormGroup;
  accountId;
  // employeeId;
  accountName;
  genderObj = [{name: 'Nam', value: true}, {name: 'Nữ', value: false}];
  employeeGender;

  constructor(private router: Router,
              private personalInfoService: PersonalInfoService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private tokenStorageService: TokenStorageService,) {
  }

  ngOnInit(): void {
    this.formUpdateEmployee = this.fb.group({
      employeeId: new FormControl(''),
      employeeName: new FormControl('', [Validators.required, Validators.max(50), Validators.pattern(/^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)[ ])+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)$/)]),
      employeeGender: new FormControl('', [Validators.required]),
      employeeBirthday: ['', [Validators.required]],
      employeePhone: new FormControl('', [Validators.required, Validators.pattern(/^(0)[35789][0-9]{8}$/)]),
      employeeGmail: new FormControl('', [Validators.required, Validators.pattern(/\b[\w.%-]+@[-.\w]+\.[A-Za-z]{2,4}\b/)]),
      employeeAddress: new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)[ ])+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)$/)]),
      urlImage: new FormControl('img'),
    });
    this.accountId = this.tokenStorageService.getUser().id;
    this.personalInfoService.findEmployeeByAccountId(this.accountId).subscribe((data1: any) => {
      this.formUpdateEmployee.patchValue(data1);
      this.accountId = data1.account.accountId;
      this.accountName = data1.account.userName;
      this.employeeGender = data1.employeeGender;
    });
  }

  update() {
    if (this.formUpdateEmployee.valid) {
      this.personalInfoService.updateEmployee(this.formUpdateEmployee.value).subscribe(data => {
        this.toastr.success("Cập nhật thông tin cá nhân thành công!", "Thành công: ", {
          timeOut: 2500,
          extendedTimeOut: 1500
        });
        this.router.navigateByUrl("/employee/acc-detail");
      });
    } else {
      this.toastr.error("Cập nhật thông tin cá nhân không thành công!", "Thất bại: ", {
        timeOut: 2500,
        extendedTimeOut: 1500
      });
    }
  }
}
