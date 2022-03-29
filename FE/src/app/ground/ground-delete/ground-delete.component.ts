import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {GroundService} from "../../service/ground.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ground-delete',
  templateUrl: './ground-delete.component.html',
  styleUrls: ['./ground-delete.component.scss']
})
export class GroundDeleteComponent implements OnInit {
  @Input()
  deleteId: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(
    public groundService: GroundService,
    public router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  deleteGround() {
    this.groundService.deleteGroundById(this.deleteId).subscribe(
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
