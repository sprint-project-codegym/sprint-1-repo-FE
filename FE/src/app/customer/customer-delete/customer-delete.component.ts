import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.scss']
})
export class CustomerDeleteComponent implements OnInit {
  @Input()
  deleteId: string;
  @Input()
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(
    public customerService: CustomerService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  deleteCustomer(){
    this.customerService.deleteCustomerById(this.deleteId).subscribe(
      data => {
        document.getElementById('closeModal').click();
        this.deleteComplete.emit(true);
      }
    );
  }

}
