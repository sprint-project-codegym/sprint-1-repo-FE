import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {Router} from "@angular/router";

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
    constructor(private employeeService: EmployeeService, private router: Router) { }

    ngOnInit(): void {
    }

    deleteEmployee() {
      this.employeeService.deleteEmployeeById(this.deleteId).subscribe(data => {
        document.getElementById('closeModal').click();
        this.deleteComplete.emit(true);
      })
  }
}
