import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FloorService} from "../../service/floor.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-floor-delete',
  templateUrl: './floor-delete.component.html',
  styleUrls: ['./floor-delete.component.scss']
})
export class FloorDeleteComponent implements OnInit {
  @Input()
  deleteId: string;

  @Input()
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(
    public floorService: FloorService,
    public router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteFloor(){
    this.floorService.deleteFloorById(this.deleteId).subscribe(
      () => {
        document.getElementById('closeModal').click();
        this.deleteComplete.emit(true);
        this.toastrService.success('Xóa thành công tầng');
      }, error => {
        this.toastrService.error('Đã xảy ra lỗi', 'Vui lòng thử lại');
      }
    );
  }
}
