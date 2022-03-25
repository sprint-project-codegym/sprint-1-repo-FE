import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../../entity/ICustomer';
import {ContractService} from '../../service/contract.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {IGround} from '../../entity/IGround';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss']
})
export class ContractCreateComponent implements OnInit {

  public customerList: ICustomer[];
  public groundList: IGround[];
  public formGroup: FormGroup;

  constructor(private contractService: ContractService,
              private formBuilder: FormBuilder,
              private route: Router,
              private toastrService: ToastrService,
              private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getAllCustomer();
    this.getAllGround();
    this.myForm();
    this.formGroup.get('rentCost').valueChanges.subscribe(() => this.formGroup.get('totalCost').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));
    this.formGroup.get('totalCost').valueChanges.subscribe(() => this.formGroup.get('rentCost').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));
    this.formGroup.get('startDate').valueChanges.subscribe(() => this.formGroup.get('endDate').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));
    this.formGroup.get('endDate').valueChanges.subscribe(() => this.formGroup.get('startDate').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));

  }

  smallerThanOtherTime(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      const thisValue = control.value;
      const otherValue = control.parent.get(otherControlName).value;
      if (thisValue < otherValue) {
        return null;
      }

      return {
        smallerThanOtherTime: true
      };
    };
  }

  greaterThanOtherTime(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      const thisValue = control.value;
      const otherValue = control.parent.get(otherControlName).value;
      if (thisValue > otherValue) {
        return null;
      }

      return {
        greaterThanOtherTime: true
      };
    };
  }


  smallerThan(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      const thisValue = +control.value;
      const otherValue = +control.parent.get(otherControlName).value;
      if (thisValue <= otherValue) {
        return null;
      }

      return {
        smallerThan: true
      };
    };
  }

  greaterThan(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      const thisValue = +control.value;
      const otherValue = +control.parent.get(otherControlName).value;
      if (thisValue >= otherValue) {
        return null;
      }

      return {
        greaterThan: true
      };
    };
  }

  myForm() {
    this.formGroup = this.formBuilder.group({
      contractId: ['', [Validators.required, Validators.pattern('^(HD)[-][\\d]{4}$')]],
      contractDate: ['', [Validators.required]],
      startDate: ['', [Validators.required, this.smallerThanOtherTime('endDate')]],
      endDate: ['', [Validators.required, this.greaterThanOtherTime('startDate')]],
      contractContent: ['', [Validators.required]],
      rentCost: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d)[0-9]*$'), Validators.min(0), this.smallerThan('totalCost')]],
      totalCost: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d)[0-9]*$'), Validators.min(0), this.greaterThan('rentCost')]],
      customerId: ['', [Validators.required]],
      groundId: ['', [Validators.required]],
      employeeId: ['E006']
    });
  }

  getAllCustomer(): void {
    this.contractService.getAllCustomer().subscribe(data => {
      this.customerList = data;
    });
  }

  getAllGround(): void {
    this.contractService.getAllGround().subscribe(data => {
      this.groundList = data;
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    this.contractService.createContract(this.formGroup.value).subscribe(data => {
        this.toastrService.success(
          'Thêm mới thành công!',
          'Thông báo!',
          {timeOut: 3000, extendedTimeOut: 1500}
        );
        console.log(data);
      },
      error => {
        this.toastrService.error(
          'Mã Hợp Đồng đã tồn tại!',
          'Có lỗi xảy ra',
          {timeOut: 3000, extendedTimeOut: 1500}
        );
      });
  }
}
