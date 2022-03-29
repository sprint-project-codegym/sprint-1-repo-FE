import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  deleteId: string;
  deleteName: string;
  page = 0;
  status: string;
  @Output()
  deleteComplete = new EventEmitter<boolean>();

  // @ts-ignore
  constructor(
    private customerService: CustomerService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {
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
    this.customerService.getAllCustomer(page, this.size).subscribe(
      data => {
        if (data == null) {
          this.toastrService.info('Hiện tại chưa có khách hàng.');
        }else {
          this.customers = data['content'];
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
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

  search(page: number, id, name) {
    if (id !== undefined && name !== undefined){
      this.idInput = id.value;
      this.nameInput = name.value;
    }
    if (this.idInput === '' && this.nameInput === '') {
      this.router.navigate(['/customer/list'], {
        queryParams: {}
      });
    } else if (this.idInput === ''){
      this.router.navigate(['/customer/list'], {
        queryParams: {page, name: this.nameInput}
      });
    } else if (this.nameInput === ''){
      this.router.navigate(['/customer/list'], {
        queryParams: {page, id: this.idInput}
      });
    }else {
      {
        this.router.navigate(['/customer/list'], {
          queryParams: {page, id: this.idInput, name: this.nameInput}
        });
      }
    }
    this.customerService.searchCustomerByIdAndName(page, this.idInput, this.nameInput).subscribe(
        data => {
          if (data === null) {
            this.toastrService.info('Không tìm thấy khách hàng với điều kiện đã tìm kiếm.');
            this.onSubmit(0);
            this.idInput = '';
            this.nameInput = '';
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
