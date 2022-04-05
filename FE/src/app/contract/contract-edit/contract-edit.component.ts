import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ContractService} from '../../service/contract.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IGround} from '../../entity/IGround';
import {ICustomer} from '../../entity/ICustomer';
import {IContract} from '../../entity/IContract';
import {ToastrService} from 'ngx-toastr';
// import * as $ from 'jquery';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})
export class ContractEditComponent implements OnInit {
  public formEditContract: FormGroup;
  public contractOfId;
  customerList: ICustomer[];
  groundList: IGround[];
  contract: IContract;
  employee = new Object();
  public pipeRentCost = 0;
  public pipeTotalCost = 0;

  constructor(
    public formBuilder: FormBuilder,
    public contractService: ContractService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public toastService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getAllCustomer();
    this.getAllGround();

    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      const id = param.get('id');
      this.contractService.getContractById(id).subscribe(data => {
        this.contract = data;

        delete this.contract.employee.employeeBirthday;
        delete this.contract.employee.employeeGender;
        delete this.contract.employee.employeeIdCard;
        delete this.contract.employee.employeeGmail;
        delete this.contract.employee.employeeAddress;
        delete this.contract.employee.employeePhone;
        delete this.contract.employee.employeeSalary;
        delete this.contract.employee.urlImage;
        delete this.contract.employee.deleteFlag;
        delete this.contract.employee.account;
        delete this.contract.employee.position;
        console.log(this.contract.employee);

        this.formEditContract.setValue(this.contract);
        this.employee = this.contract.employee;
        console.log(this.contract.employee);
        console.log(this.formEditContract.value);
      });
    });

    this.formEditContract.get('rentCost').valueChanges.subscribe(() => this.formEditContract.get('totalCost').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));
    this.formEditContract.get('totalCost').valueChanges.subscribe(() => this.formEditContract.get('rentCost').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));
    this.formEditContract.get('startDate').valueChanges.subscribe(() => this.formEditContract.get('endDate').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));
    this.formEditContract.get('endDate').valueChanges.subscribe(() => this.formEditContract.get('startDate').updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    }));
  }

  createForm() {
    this.formEditContract = this.formBuilder.group(
      {
        contractId: ['', Validators.required],
        startDate: ['', [Validators.required, this.smallerThanOtherTime('endDate')]],
        endDate: ['', [Validators.required, this.greaterThanOtherTime('startDate')]],
        contractDate: ['', Validators.required],
        rentCost: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0), this.smallerThan('totalCost')]],
        totalCost: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0), this.greaterThan('rentCost')]],
        // tslint:disable-next-line:max-line-length
        contractContent: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200), Validators.pattern(/^[a-zA-Z0-9]/)]],
        deleteFlag: [],
        customer: ['', Validators.required],
        employee: this.formBuilder.group({
          employeeName: [],
          employeeId: [],
        }),
        ground: ['', Validators.required]
      }
    );
  }

  getAllCustomer() {
    this.contractService.getAllCustomer().subscribe(data => {
      this.customerList = data;
      console.log(data);
    });
  }

  getAllGround() {
    this.contractService.getAllGround().subscribe(data => {
      this.groundList = data;
      console.log(data);
    });
  }

  compareFn1(c1: IGround, c2: IGround): boolean {
    return c1 && c2 ? c1.groundId === c2.groundId : c1 === c2;
  }

  compareFn2(c1: ICustomer, c2: ICustomer): boolean {
    return c1 && c2 ? c1.customerId === c2.customerId : c1 === c2;
  }

  editContract() {
    console.log(this.formEditContract.value);
    this.contractService.updateContract(this.contract.contractId, this.formEditContract.value).subscribe(data => {
      this.router.navigate(['contract/list']);
      this.toastService.success('Chỉnh sửa thành công!', 'Thông báo', {
        timeOut: 3000,
        extendedTimeOut: 1500,
      });
      console.log(data);
    }, error => {
      this.toastService.error('Chỉnh sửa thất bại!', 'Thông báo', {
        timeOut: 3000,
        extendedTimeOut: 1500,
      });
      console.log(error);
    });
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

  Submit() {
    this.editContract();
  }

  reloadPage(){
    this.ngOnInit();
  }
}
