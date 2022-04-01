import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient) {
  }

  contUrrl = 'http://localhost:8080/api/manager/contract';
  // getAllContract(): Observable<any> {
  //   return this.httpClient.get(this.contUrrl);
  // }
  // get contract with pagination
  getAllContract(page: number, size: number): Observable<any> {
    return this.httpClient.get(this.contUrrl + '/list?page=' + page + '&size=' + size);
  }

  searchContractByIdAndCusName(page: number, id: string, cusName: string ): Observable<any> {
    return this.httpClient.get(this.contUrrl + '/list?page=' + page + '&id=' + id + '&customerName=' + cusName);
  }

  deleteContractById(deleteId: string) {
    return this.httpClient.get(this.contUrrl + '/list/delete/' + deleteId);
  }
}

