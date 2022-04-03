import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public ApiEmployeeList: string = 'http://localhost:8080/api/home/employee';
  public ApiEmployeeCreate: string = 'http://localhost:8080/api/home/employee/create';
  public ApiEmployeeEdit: string = 'http://localhost:8080/api/home/employee/edit';
  public ApiGetAllPosition: string = 'http://localhost:8080/api/home/employee/position';
  constructor(public http: HttpClient) { }

  createEmployee(employee: any):Observable<any>{
    return this.http.post(`${this.ApiEmployeeCreate}`,employee);
  }

  editEmployee(employee: any, id: any):Observable<any>{
    return this.http.put(`${this.ApiEmployeeEdit}/${id}`,employee);
  }

  getEmployeeById(id: any):Observable<any>{
    return this.http.get(`${this.ApiEmployeeList}/${id}`,);
  }

  getAllPosition(): Observable<any> {
    return this.http.get(this.ApiGetAllPosition);
  }
}
