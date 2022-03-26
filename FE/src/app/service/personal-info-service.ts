import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  // service của Nhung
  private personalInfoURL = 'http://localhost:8080/api/personal-info/';
  private changePassURL = 'http://localhost:8080/api/user-change-password/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  findEmployeeByEmployeeId(id) {
    return this.http.get(this.personalInfoURL + id);
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
