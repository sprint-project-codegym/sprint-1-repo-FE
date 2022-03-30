import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonalInfoService} from '../../service/personal-info-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-account-detail',
  templateUrl: './employee-account-detail.component.html',
  styleUrls: ['./employee-account-detail.component.scss']
})
export class EmployeeAccountDetailComponent implements OnInit {
  formUpdateEmployee: FormGroup;
  employeeId = 'E007';
  accountName;
  genderObj = [{name: 'Nam' , value : true} , {name: 'Nữ' , value : false}];
  employeeGender;

  constructor(private router: Router,
              private personalInfoService: PersonalInfoService,
              private toastr: ToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formUpdateEmployee = this.fb.group({
      employeeId: new FormControl(''),
      employeeName: new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)[ ])+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)$/)]),
      employeeGender: new FormControl('', [Validators.required]),
      employeeBirthday: ['', [Validators.required]],
      employeePhone: new FormControl('', [Validators.required, Validators.pattern(/^(0)[35789][0-9]{8}$/)]),
      employeeGmail: new FormControl(''),
      employeeAddress: new FormControl('', [Validators.required, Validators.pattern(/^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)[ ])+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]([a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)$/)]),
      urlImage: new FormControl('img'),
    });
    // this.employeeId = this.token.getUser().id;
    this.personalInfoService.findEmployeeByEmployeeId(this.employeeId).subscribe((data1: any) => {
      this.formUpdateEmployee.patchValue(data1);
      this.employeeId = data1.employeeId;
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
    }
  }

}
