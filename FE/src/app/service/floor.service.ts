import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private API = 'http://localhost:8080/api/home/floor';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  //
  getAllFloor(page: number, size: number): Observable<any> {
    return this._httpClient.get(this.API + '/list' + '?page=' + page + '&size=' + size);
  }

  //
  findFloorById(id: string): Observable<any> {
    return this._httpClient.get(this.API + '/' + id);
  }

  //
  deleteFloorById(id: string): Observable<any> {
    return this._httpClient.get(this.API + '/' + 'delete' + '/' + id, this.httpOptions);
  }

}
