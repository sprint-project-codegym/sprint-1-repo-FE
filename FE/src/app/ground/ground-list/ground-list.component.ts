import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { IGround } from 'src/app/entity/IGround';
import { GroundService } from 'src/app/service/ground.service';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ground-list',
  templateUrl: './ground-list.component.html',
  styleUrls: ['./ground-list.component.scss']
})
export class GroundListComponent implements OnInit {
  grounds: IGround[];
  size = 5;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  id: string;
  idInput = "";
  typeInput = "";
  deleteId: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();



  constructor(private groundService: GroundService, private  toastrService: ToastrService, private router : Router) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  onFirst() {
    this.pageClicked = 0;
    this.search(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.search(this.pageClicked);
    }
  }

  onSubmit(page) {
    this.groundService.getAllGround(page, this.size).subscribe(
      data => {
        this.grounds = data['content'];
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, { length: this.totalPages }).map(Number.call, Number);
      }
    );
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.search(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.search(this.pageClicked);
  }


  search(page: number, id, type) {
    if (id !== undefined && name !== undefined){
      this.idInput = id.value;
      this.typeInput = type.value;
    }
    this.groundService.searchGround(this.idInput, this.typeInput, page).subscribe(
      data => {
        if (data === null) {
          this.toastrService.info('Không tìm thấy khách hàng theo điều kiện đã tìm kiếm');
          this.onSubmit(0);
          this.idInput = "";
          this.typeInput = "";
        } else {
          this.grounds = data['content'];
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
