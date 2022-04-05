import {Component, OnInit, Optional} from '@angular/core';
import {IEmployee} from "../model/employee";
import {EmployeeService} from "../../service/employee.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[];
  pageClicked: number = 0;
  pages = [];
  size = 5;
  totalPages: 1;
  idSearch: "";
  nameSearch: "";
  deleteId: string;
  deleteName: string;

  constructor(private employeeService: EmployeeService, private toast: ToastrService, private router :Router) { }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  onFirst() {
    this.pageClicked = 0;
    // @ts-ignore
    this.getSearch(this.pageClicked);
  }

  onPrevious() {
    if(this.pageClicked>0){
      this.pageClicked--;
      // @ts-ignore
      this.getSearch(this.pageClicked);
    }
  }

  onSubmit(page) {
    this.employeeService.getAllEmployees(page, this.size).subscribe(data => {
      if(data == null){
        this.employees=[];
      }
      this.employees=data['content'];
      this.pageClicked = page;
      this.totalPages = data.totalPages;
      this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
    })
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    // @ts-ignore
    this.getSearch(this.pageClicked)
  }

  onNext() {
    if(this.pageClicked < this.totalPages - 1){
      this.pageClicked++;
      // @ts-ignore
      this.getSearch(this.pageClicked);
    }
  }

  deleteSuccess() {
    this.ngOnInit();
  }

  getSearch(page: number, id, name) {
    // if (this.idSearch === undefined) {
    //   this.idSearch = "";
    // }
    // if (this.nameSearch === undefined) {
    //   this.nameSearch = "";
    // }
    if (id !== undefined && name !== undefined) {
      this.idSearch = id.value;
      this.nameSearch = name.value;
    }
    if (this.idSearch === '' && this.nameSearch === '') {
      this.router.navigate(['/employee/list'], {
        queryParams: {}
      });
    } else if (this.idSearch === ''){
      this.router.navigate(['/employee/list'], {
        queryParams: {page, name: this.nameSearch}
      });
    } else if (this.nameSearch === ''){
      this.router.navigate(['/employee/list'], {
        queryParams: {page, id: this.idSearch}
      });
    }else {
      {
        this.router.navigate(['/employee/list'], {
          queryParams: {page, id: this.idSearch, name: this.nameSearch}
        });
      }
    }
      this.employeeService.findEmployeeByIdAndName(this.idSearch, this.nameSearch, page).subscribe(data => {
        if (data === null) {
          this.employees = [];
          // this.toast.info("không có dữ liệu","Thông báo");
          // this.onSubmit(0);
          // this.idSearch = "";
          // this.nameSearch = "";
        } else {
          this.employees = data['content'];
          this.pageClicked = page;
          // @ts-ignore
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }

      })

  }
}
