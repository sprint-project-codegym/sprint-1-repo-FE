import {Injectable} from '@angular/core';
import {ContractDTO} from '../dto/ContractDTO';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {IContract} from '../entity/IContract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private API = 'http://localhost:8080/api/manager/contract';

  constructor(private httpClient: HttpClient) {
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  searchContractByIdAndCusName(page: number, id: string, cusName: string): Observable<any> {
    return this.httpClient.get(this.API + '/list?page=' + page + '&id=' + id + '&customerName=' + cusName);
  }

  deleteContractById(deleteId: string) {
    return this.httpClient.get(this.API + '/list/delete/' + deleteId)
  }

  getAllCustomer(): Observable<any> {
    return this.httpClient.get<any>(this.API + '/list-customer');
  }

  getAllGround(): Observable<any> {
    return this.httpClient.get<any>(this.API + '/list-ground');
  };

  createContract(contractDTO: ContractDTO): Observable<ContractDTO> {
    console.log(JSON.stringify(contractDTO));
    return this.httpClient.post<ContractDTO>(this.API + '/create', JSON.stringify(contractDTO), this.httpOptions);
  }

  getContractById(contractId): Observable<any> {
    return this.httpClient.get<any>(this.API + '/' + contractId, this.httpOptions);
  }

  updateContract(id: any, obj: IContract): Observable<any> {
    return this.httpClient.put<any>(this.API + '/edit/' + id, obj, this.httpOptions);
  }

  getAllContract(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/list?page=' + page + '&size=' + size, this.httpOptions);
  }

  getIdContract(id: string): Observable<any> {
    if (id == null) {
      return EMPTY;
    } else {
      return this.httpClient.get<any>(this.API + '/list/' + id, this.httpOptions);
    }
  }
}

