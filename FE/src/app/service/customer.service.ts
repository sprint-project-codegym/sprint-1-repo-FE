import { Injectable } from '@angular/core';
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

  // NgaLT
  // get customer with pagination
  getAllCustomer(page: number, size: number): Observable<any> {
    return this.http.get(this.API + '?page=' + page + '&size=' + size);
  }

  // search customer by id and name
  searchCustomerByIdAndName(idSearch: string, name: string, size: number): Observable<any> {
    return this.http.get(this.API + '?id=' + idSearch + '&name=' + name + '&size' + size);
  }

  getCustomerById(id: string): Observable<any> {
    return this.http.get(this.API + '/' + id);
  }

  deleteCustomerById(idDelete: string): Observable<any> {
    return this.http.get(this.API + '/' + 'delete' + '/' + idDelete, this.httpOptions);
  }

}
