import {Component, OnInit} from '@angular/core';
import {IContract} from "../../entity/IContract";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContractService} from "../../service/contract.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  contractList: IContract[];
  size = 2;
  pageClicked = 0;
  totalPages = 1;
  pages = [];

  constructor(private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onSubmit(page) {
    this.contractService.getAllContract(page, this.size).subscribe(
      data => {
        this.contractList = data['content'];
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    );
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  // search(page: Number) {
  //   this.contractService.searchContractByIdAndCusName(this.idInput, this.cusNameInput).subscribe()
  // }
}
