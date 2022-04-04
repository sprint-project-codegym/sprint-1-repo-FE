// @ts-ignore
import { Injectable } from '@angular/core';
// @ts-ignore
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private API = 'http://localhost:8080/customer/list';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    private http: HttpClient
  ) {
  }

  // NgaLT get customer with pagination
  getAllCustomer(page: number, size: number): Observable<any> {
    return this.http.get(this.API + '?page=' + page + '&size=' + size);
  }

  // NgaLT search customer by id and name
  searchCustomerByIdAndName(page: number, idSearch: string, name: string): Observable<any> {
    return this.http.get(this.API + '?page=' + page + '&id=' + idSearch + '&name=' + name);
  }

// NgaLT delete customer
  deleteCustomerById(idDelete: string): Observable<any> {
    return this.http.get(this.API + '/' + 'delete' + '/' + idDelete, this.httpOptions);
  }

}
