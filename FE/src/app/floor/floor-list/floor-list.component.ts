import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IFloor} from "../../entity/IFloor";
import {FloorService} from "../../service/floor.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss']
})
export class FloorListComponent implements OnInit {
  floors: IFloor[];
  size = 10;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  public id: string;
  deleteId: string;
  deleteName: string;
  role: string;
  currentUser: string;
  username: string;
  accountId: number;
  isLoggedIn: boolean = false;

  @Output()
  deleteComplete = new EventEmitter<boolean>();
  constructor(
    private floorService: FloorService,
    public router: Router,
    private tokenStorageService: TokenStorageService,
    private shareService : ShareService,
  ) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
    this.loadHeader()
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

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
    this.getUsernameAccount();
  }

  getUsernameAccount(){
    if (this.tokenStorageService.getToken()) {
      this.accountId= this.tokenStorageService.getUser().id;
    }
  }
}
