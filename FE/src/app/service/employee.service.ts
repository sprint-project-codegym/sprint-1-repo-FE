import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public ApiEmployeeList: string = 'http://localhost:8080/api/manager/employee';
  public ApiEmployeeCreate: string = 'http://localhost:8080/api/manager/employee/create';
  public ApiEmployeeEdit: string = 'http://localhost:8080/api/manager/employee/edit';
  public ApiGetAllPosition: string = 'http://localhost:8080/api/manager/employee/position';
  public ApiGetNewUserNameEmployee: string = " http://localhost:8080/api/manager/employee/generate-username";
  private API_URL = 'http://localhost:8080/api/manager/employee';
  constructor(public http: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.ApiEmployeeCreate}`, employee,this.httpOptions);
  }
  /*HauLC*/
  createUsername(nameInput: any):Observable<any>{
    return this.http.post(`${this.ApiGetNewUserNameEmployee}`,nameInput);
  }
  editEmployee(employee: any, id: any): Observable<any> {
    return this.http.put(`${this.ApiEmployeeEdit}/${id}`, employee,this.httpOptions);
  }
  getEmployeeById(id: any): Observable<any> {
    return this.http.get(`${this.ApiEmployeeList}/${id}`,this.httpOptions);
  }
  getAllPosition(): Observable<any> {
    return this.http.get(this.ApiGetAllPosition,this.httpOptions);
  }
  getAllEmployees(page: number, size: number): Observable<any> {
    return this.http.get(this.API_URL + '/list?page=' + page + '&size=' + size,this.httpOptions);
  }
  findEmployeeByIdAndName(id: string, name: string, page: number) {
    return this.http.get(this.API_URL + '/list?name=' + name + '&id=' + id + '&page=' + page,this.httpOptions);
  }
  deleteEmployeeById(id: string) {
    // @ts-ignore
    return this.http.get(this.API_URL + '/delete' + '/' + id, this.httpOptions,this.httpOptions);
  }
  // getAllCars(): Observable<IEmployee[]>{
  //   return this.http.get<IEmployee[]>(this.API_URL);
  // }
}
