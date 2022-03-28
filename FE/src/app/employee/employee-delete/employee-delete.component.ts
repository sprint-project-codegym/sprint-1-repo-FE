import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent implements OnInit {
  @Input()
    deleteName: string;

  @Input()
    deleteId: string;

  @Output()
    deleteComplete = new EventEmitter<boolean>();
    constructor(private employeeService: EmployeeService, private router: Router, private toast: ToastrService) { }

    ngOnInit(): void {
    }

    deleteEmployee() {
      this.employeeService.deleteEmployeeById(this.deleteId).subscribe(data => {
        document.getElementById('closeModal').click();
        this.deleteComplete.emit(true);
        this.toast.success("Xóa thành công","Thao tác");

      }, error => {this.toast.success("Xóa không thành công","Thao tác");})
  }
}
