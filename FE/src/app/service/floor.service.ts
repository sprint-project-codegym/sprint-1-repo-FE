import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private API = 'http://localhost:8080/api/home/floor';

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  //
  getAllFloor(page: number, size: number): Observable<any> {
    return this._httpClient.get(this.API + '/list' + '?page=' + page + '&size=' + size);
  }

  //
  findFloorById(id: string) {
    return this._httpClient.get(this.API + '/' + id);
  }

  //
  deleteFloorById(id: string) {
    // @ts-ignore
    return this._httpClient.get(this.API + '/' + 'delete' + '/' + id);
  }

}
