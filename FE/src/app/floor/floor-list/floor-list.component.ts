import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IFloor} from "../../entity/IFloor";
import {FloorService} from "../../service/floor.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss']
})
export class FloorListComponent implements OnInit {
  floors: IFloor[];
  size = 2;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  public id: string;
  deleteId: string;
  deleteName: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();
  constructor(
    private floorService: FloorService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onSubmit(page) {
    this.floorService.getAllFloor(page, this.size).subscribe(
      data => {
        this.floors = data['content'];
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    );
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  deleteSuccess() {
    this.onSubmit(0);
  }
}
