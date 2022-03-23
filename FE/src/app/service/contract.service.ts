import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient) { }

  contUrrl = 'http://localhost:8080/list';
  // getAllContract(): Observable<any> {
  //   return this.httpClient.get(this.contUrrl);
  // }
  // get contract with pagination
  getAllContract(page: number, size: number): Observable<any> {
    return this.httpClient.get(this.contUrrl + '?page=' + page + '&size=' + size);
  }
  searchContractByIdAndCusName(id: String, cusName: String){
    return this.httpClient.get(this.contUrrl + '/' + '?id=' + id + '&customerName=' + cusName);
  }
}
