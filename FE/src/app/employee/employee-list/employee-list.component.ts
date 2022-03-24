import { Component, OnInit } from '@angular/core';
import {IEmployee} from "../model/employee";
import {EmployeeService} from "../../service/employee.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: IEmployee[];
  id = '';
  name = '';
  pageClicked: number = 0;
  pages = [];
  size =6;
  totalPages: 1;
  deleteId: string;
  deleteName: string;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onPrevious() {
    if(this.pageClicked>0){
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onSubmit(page) {
    this.employeeService.getAllEmployees(page, this.size).subscribe(data => {
      this.employees=data['content'];
      this.pageClicked = page;
      this.totalPages = data.totalPages;
      this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
    })
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked)
  }

  onNext() {
    if(this.pageClicked < this.totalPages - 1){
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  // show() {
  //   this.toast.success("nothing","title");
  // }

  deleteSuccess() {
    this.ngOnInit();
  }

  getSearch(page: number) {
    this.employeeService.findEmployeeByIdAndName(this.id,this.name,this.size).subscribe(data =>{
      if(data == null){
        this.id = '';
        this.name = '';
        this.onSubmit(0);
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
