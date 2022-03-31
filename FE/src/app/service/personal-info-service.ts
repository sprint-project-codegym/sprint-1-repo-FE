import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  httpOptions: any;
  // service của Nhung
  private personalInfoURL = 'http://localhost:8080/api/home/personal-info/';
  private changePassURL = 'http://localhost:8080/api/home/personal-info/change-password/';

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };
  //
  // constructor(private http: HttpClient) {
  // }

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findEmployeeByAccountId(id) {
    return this.http.get(this.personalInfoURL + id, this.httpOptions);
  }

  updateEmployee(data) {
    return this.http.put(this.personalInfoURL + 'edit', JSON.stringify(data), this.httpOptions);
  }

  changePassword(id, data) {
    return this.http.put(this.changePassURL + id, data);
  }

  getPass(id: number, password: string): Observable<any> {
    return this.http.post<any>(this.personalInfoURL + 'getPass/' + id, password, this.httpOptions);
  }
}
