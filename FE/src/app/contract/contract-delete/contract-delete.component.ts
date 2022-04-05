import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContractService} from "../../service/contract.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contract-delete',
  templateUrl: './contract-delete.component.html',
  styleUrls: ['./contract-delete.component.scss']
})
export class ContractDeleteComponent implements OnInit {
  @Input()
  deleteId: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(
    public contractService: ContractService,
    public router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }
  deleteContract() {
    this.contractService.deleteContractById(this.deleteId).subscribe(
      data => {
        document.getElementById('closeModal').click();
        this.toastrService.success("Xóa thành công", "Thông báo")
        this.deleteComplete.emit(true);
      }, error => {
        this.toastrService.error('Đã xảy ra lỗi', 'Vui lòng thử lại');
        this.deleteComplete.emit(true);
      }
    );
  }
}
