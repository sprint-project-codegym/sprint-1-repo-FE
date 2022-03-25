import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {Router} from '@angular/router';
import {ICustomer} from '../../entity/ICustomer';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: ICustomer[];
  size = 5;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  idInput = '';
  nameInput = '';
  id: string;
  errorMessage = '';
  deleteId: string;
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();
  // @ts-ignore
  constructor(
    private customerService: CustomerService,
    public router: Router,
    private toastrService: ToastrService
  ) {
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
    this.customerService.getAllCustomer(page, this.size).subscribe(
      data => {
        this.customers = data['content'];
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

  search(page: number) {
    this.customerService.searchCustomerByIdAndName(this.idInput, this.nameInput, this.size).subscribe(
      data => {
        if (data === null) {
          // this.idInput = '';
          // this.nameInput = '';
          this.toastrService.info('Không tìm thấy khách hàng');
          this.onSubmit(0);
        } else {
          this.customers = data['content'];
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
