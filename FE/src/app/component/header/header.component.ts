import {Component, Injectable, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import {Route, Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable({
  providedIn: 'root',
})

export class HeaderComponent implements OnInit {

  username: string;
  accountId: number;
  currentUser: string;
  role: string;
  isLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
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


  ngOnInit(): void {
    this.loadHeader();
  }

  logOut() {
    this.tokenStorageService.signOut();
    window.location.assign("/");
  }


  getUsernameAccount() {
    if (this.tokenStorageService.getToken()) {
      this.accountId = this.tokenStorageService.getUser().id;
    }
  }
}
