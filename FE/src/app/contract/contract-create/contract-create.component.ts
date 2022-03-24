import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../../entity/ICustomer';
import {ContractService} from '../../service/contract.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IGround} from '../../entity/IGround';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {ToastrService} from 'ngx-toastr';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MY_DATE_FORMATS} from './my-datepicker';

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
  }

  myForm() {
    // const YEAR = new Date().getFullYear();
    // const MONTH = new Date().getMonth();
    // const DAY = new Date().getDate();
    //
    // console.log(
    //   YEAR + '-' + MONTH + '-' + DAY
    // );
    this.formGroup = this.formBuilder.group({
      contractId: ['', [Validators.required]],
      contractDate: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [MY_DATE_FORMATS, [Validators.required]],
      contractContent: ['', [Validators.required]],
      rentCost: ['', [Validators.required]],
      totalCost: ['', [Validators.required]],
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
