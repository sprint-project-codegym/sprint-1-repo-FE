import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IContract} from "../entity/IContract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private API = 'http://localhost:8080';

  private url: string;

  constructor(
    private http: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': 'GET,PUT,PATCH,POST,DELETE,OPTIONS'
    }),
  };

  getContractById(contractId): Observable<any> {
    return this.http.get(this.API + "/contract/" + contractId, this.httpOptions);
  }

  getAllCustomer(): Observable<any> {
    return this.http.get<any>(this.API + '/customer/detail', this.httpOptions);
  }

  getAllGround(): Observable<any> {
    return this.http.get<any>(this.API + '/ground/detail', this.httpOptions);
  }

  updateContract(id: any,obj: IContract): Observable<any> {
    return this.http.put<any>(this.API + '/contract/edit/' + id, obj, this.httpOptions);
  }

  getAllContract(page: number, size: number): Observable<any> {
    return this.http.get(this.API + '/contract/list?page=' + page + '&size=' + size, this.httpOptions);
  }

  searchContractByIdAndCusName(id: String, cusName: String) {
    return this.http.get(this.API + '/contract/list/' + '?id=' + id + '&customerName=' + cusName, this.httpOptions);
  }
}
