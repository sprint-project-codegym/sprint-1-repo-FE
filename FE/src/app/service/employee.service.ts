import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public ApiEmployeeList: string = 'http://localhost:8080/api/home/employee';
  public ApiEmployeeCreate: string = 'http://localhost:8080/api/home/employee/create';
  public ApiEmployeeEdit: string = 'http://localhost:8080/api/home/employee/edit';
  public ApiGetAllPosition: string = 'http://localhost:8080/api/home/employee/position';
  private API_URL = 'http://localhost:8080/api/home/employee';

  constructor(public http: HttpClient) {
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.ApiEmployeeCreate}`, employee);
  }

  editEmployee(employee: any, id: any): Observable<any> {
    return this.http.put(`${this.ApiEmployeeEdit}/${id}`, employee);
  }

  getEmployeeById(id: any): Observable<any> {
    return this.http.get(`${this.ApiEmployeeList}/${id}`,);
  }

  getAllPosition(): Observable<any> {
    return this.http.get(this.ApiGetAllPosition);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  getAllEmployees(page: number, size: number): Observable<any> {
    return this.http.get(this.API_URL + '/list?page=' + page + '&size=' + size);
  }

  findEmployeeByIdAndName(id: string, name: string, page: number) {
    return this.http.get(this.API_URL + '/list?name=' + name + '&id=' + id + '&page=' + page);
  }

  deleteEmployeeById(id: string) {
    return this.http.get(this.API_URL + '/delete' + '/' + id, this.httpOptions);
  }

  // getAllCars(): Observable<IEmployee[]>{
  //   return this.http.get<IEmployee[]>(this.API_URL);
  // }
}
