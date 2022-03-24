import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContractService} from "../../service/contract.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {IGround} from "../../entity/IGround";
import {ICustomer} from "../../entity/ICustomer";
import {IEmployee} from "../../entity/IEmployee";
import {IContract} from "../../entity/IContract";

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
  employee: IEmployee;

  constructor(
    public formBuilder: FormBuilder,
    public contractService: ContractService,
    public router: Router,
    public activeRoute: ActivatedRoute
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
        this.formEditContract.setValue(this.contract);
        console.log(data);
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
        rentCost: ["", Validators.required],
        totalCost: ["", Validators.required],
        contractContent: ["", Validators.required],
        deleteFlag: [],
        customer: ["", Validators.required],
        employee: ["", Validators.required],
        ground: ["", Validators.required]
      }
    )
  }

  getAllCustomer() {
    this.contractService.getAllCustomer().subscribe(data => {
      this.customerList = data;
      console.log(data);
    })
  }

  getAllGround() {
    this.contractService.getAllGround().subscribe(data => {
      this.groundList = data;
      console.log(data);
    })
  }

  compareFn1(c1: IGround, c2: IGround): boolean {
    return c1 && c2 ? c1.groundId === c2.groundId : c1 === c2;
  }

  compareFn2(c1: ICustomer, c2: ICustomer): boolean {
    return c1 && c2 ? c1.customerId === c2.customerId : c1 === c2;
  }

  onSubmit() {
    if (this.formEditContract.valid) {
      this.contractService.updateContract(this.formEditContract.value).subscribe(() => this.router.navigateByUrl("/contract/list"))
    }
  }

  editContract() {
    console.log(this.formEditContract.value);
    this.contractService.updateContract(this.formEditContract.value).subscribe(data => {
      this.router.navigate(['contract/list']);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  refresh() {
    window.location.reload();
  }
}
