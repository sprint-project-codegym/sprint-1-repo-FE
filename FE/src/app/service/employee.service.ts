import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IEmployee} from "../employee/model/employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = 'http://localhost:8080/api/admin/employee/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private http: HttpClient) { }

  getAllEmployees(page: number, size: number): Observable<any> {
    return this.http.get(this.API_URL + '?page=' + page + '&size=' + size);
  }
  findEmployeeByIdAndName(id: string, name: string, size:number) {
    return this.http.get(this.API_URL + '?name=' +name+ '&id=' +id+ '&size=' +size);
  }

  deleteEmployeeById(id: string) {
    return this.http.get(this.API_URL  + 'delete' + '/' + id, this.httpOptions);
  }
  // getAllCars(): Observable<IEmployee[]>{
  //   return this.http.get<IEmployee[]>(this.API_URL);
  // }
}
