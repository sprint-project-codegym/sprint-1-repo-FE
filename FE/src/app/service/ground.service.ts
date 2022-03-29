import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroundService {

  constructor(private httpClient: HttpClient) { }

  groundUrl = 'http://localhost:8080/api/ground';
  getAllGround(page: number, size:number): Observable<any> {
    return this.httpClient.get(this.groundUrl +'/list'+'?page=' + page + "&size=" + size);
  }

  searchGround(id: string, type: string, page: number): Observable<any> {
    return this.httpClient.get(this.groundUrl +'/list'+'?id=' + id + '&groundType=' + type + '&page=' + page);
  }
  // getAllLoaiXe(): Observable<any> {
  //   return this.httpClient.get(this.groundUrl);
  // }
  // getXeById(id: any): Observable<any> {
  //   return this.httpClient.get(this.groundUrl + '/' + id);
  // }
  // updateXe(obj: any): Observable<any> {
  //   return this.httpClient.put(this.groundUrl + '/' + obj.id, obj);
  // }
  // deleteXe(id: any): Observable<any> {
  //   return this.httpClient.delete(this.groundUrl + '/' + id);
  // }

  deleteGroundById(deleteId: string) {
    return this.httpClient.delete(this.groundUrl + '/delete/' + deleteId);
  }
}
