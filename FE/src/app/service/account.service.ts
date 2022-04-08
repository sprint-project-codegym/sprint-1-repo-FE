import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "../entity/IAccount";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseURL = 'http://localhost:8080/api/home/account';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.baseURL);
  }
}
