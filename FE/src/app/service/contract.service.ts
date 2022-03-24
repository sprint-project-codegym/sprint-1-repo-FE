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
      'Content-Type': 'application/json'
    }),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
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

  updateContract(obj: IContract): Observable<any> {
    return this.http.patch<any>(this.API + '/contract/edit' + obj.contractId, obj, this.httpOptions);
  }

  getAllContract(page: number, size: number): Observable<any> {
    return this.http.get(this.API + '/contract/list?page=' + page + '&size=' + size, this.httpOptions);
  }

  searchContractByIdAndCusName(id: String, cusName: String) {
    return this.http.get(this.API + '/contract/list/' + '?id=' + id + '&customerName=' + cusName, this.httpOptions);
  }
}
