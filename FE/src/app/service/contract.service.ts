import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContractDTO} from '../dto/ContractDTO';

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

  getAllCustomer(): Observable<any> {
    return this.httpClient.get<any>(this.API + '/list-customer');
  }

  getAllGround(): Observable<any> {
    return this.httpClient.get<any>(this.API + '/list-ground');
  }

  createContract(contractDTO: ContractDTO): Observable<ContractDTO> {
    console.log(JSON.stringify(contractDTO));
    // @ts-ignore
    return this.httpClient.post<ContractDTO>(this.API + '/create', JSON.stringify(contractDTO), this.httpOptions);
  }
}
