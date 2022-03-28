import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public ApiEmployeeCreate: string = 'http://localhost:8080/api/home/employee';
  public ApiGetAllPosition: string = 'http://localhost:8080/api/home/position';
  constructor(public http: HttpClient) { }

  createEmployee(employee: any):Observable<any>{
    return this.http.post(`${this.ApiEmployeeCreate}`,employee);
  }

  editEmployee(employee: any, id: any):Observable<any>{
    return this.http.put(`${this.ApiEmployeeCreate}/${id}`,employee);
  }

  getEmployeeById(id: any):Observable<any>{
    return this.http.get(`${this.ApiEmployeeCreate}/${id}`,);
  }

  getAllPosition(): Observable<any> {
    return this.http.get(this.ApiGetAllPosition);
  }

}
