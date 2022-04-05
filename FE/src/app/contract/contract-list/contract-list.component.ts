import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IContract} from "../../entity/IContract";
import {ContractService} from "../../service/contract.service";
import { Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],

})
export class ContractListComponent implements OnInit {
  contracts: IContract[];
  size = 3;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  id: string;
  idInput = "";
  cusNameInput = "";
  deleteId: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();
  constructor(private contractService: ContractService, private router : Router, private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  onFirst() {
    this.pageClicked = 0;

    // @ts-ignore
    this.search(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;

      // @ts-ignore
      this.search(this.pageClicked);
    }
  }

  onSubmit(page) {
    this.contractService.getAllContract(page, this.size).subscribe(
      data => {
        // this.contracts = data['content'];
        // this.pageClicked = page;
        // this.totalPages = data.totalPages;
        // this.pages = Array.apply(null, { length: this.totalPages }).map(Number.call, Number);
        if (data === null) {
          this.contracts = [];
        } else {
          this.contracts = data['content'];
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, { length: this.totalPages }).map(Number.call, Number);
        }
      }
    );
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      // @ts-ignore
      this.search(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    // @ts-ignore
    this.search(this.pageClicked);
  }

  search(page: number, id, cusName) {
    if (this.idInput === undefined) {
      this.idInput = "";
    }
    if (this.cusNameInput === undefined) {
      this.cusNameInput = "";
    }
    if (id !== undefined && name !== undefined) {
      this.idInput = id.value;
      this.cusNameInput = cusName.value;
    }
    if (this.idInput === '' && this.cusNameInput === '') {
      // @ts-ignore
      this.router.navigate(['contract/list'], {
        queryParams: {}
      });
    } else if (this.idInput === ''){
      this.router.navigate(['contract/list'], {
        queryParams: {page, name: this.cusNameInput}
      });
    } else if (this.cusNameInput === ''){
      this.router.navigate(['contract/list'], {
        queryParams: {page, id: this.idInput}
      });
    }else {
      {
        this.router.navigate(['contract/list'], {
          queryParams: {page, id: this.idInput, name: this.cusNameInput}
        });
      }
    }
    this.contractService.searchContractByIdAndCusName(page, this.idInput, this.cusNameInput ).subscribe(
      data => {
        if (data === null) {
          // this.toast.info('Không tìm thấy hợp đồng theo điều kiện đã tìm kiếm');
          this.contracts = [];
          // this.onSubmit(0);
          // this.idInput = "";
          // this.cusNameInput = "";
        } else {
          this.contracts = data['content'];
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      }
    );
  }

  deleteSuccess() {
    this.ngOnInit();
  }
}
