import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../service/contract.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {IGround} from "../../entity/IGround";
import {ICustomer} from "../../entity/ICustomer";
import {IContract} from "../../entity/IContract";
import {ToastrService} from "ngx-toastr";

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
      })
    })
  }

  createForm() {
    this.formEditContract = this.formBuilder.group(
      {
        contractId: ["", Validators.required],
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
        contractDate: ["", Validators.required],
        rentCost: ["", [Validators.required, Validators.min(10.0), Validators.max(100000000.0)]],
        totalCost: ["", [Validators.required, Validators.min(10.0), Validators.max(100000000.0)]],
        contractContent: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        deleteFlag: [],
        customer: ["", Validators.required],
        // employee: ["", Validators.required],
        employee: this.formBuilder.group({
          employeeName: [],
          employeeId: [],
        }),
        ground: ["", Validators.required]
      }
    )
  }

  getAllCustomer() {
    this.contractService.getAllCustomer().subscribe(data => {
      this.customerList = data;
      // console.log(data);
    })
  }

  getAllGround() {
    this.contractService.getAllGround().subscribe(data => {
      this.groundList = data;
      // console.log(data);
    })
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
      this.toastService.success("Thêm mới thành công", "Thông báo", {
        timeOut: 3000,
        extendedTimeOut: 1500,
      })
      console.log(data);
    }, error => {
      this.toastService.success("Thêm mới thất bại", "Thông báo", {
        timeOut: 3000,
        extendedTimeOut: 1500,
      })
      console.log(error);
    });
  }

  refresh() {
    window.location.reload();
  }
}
