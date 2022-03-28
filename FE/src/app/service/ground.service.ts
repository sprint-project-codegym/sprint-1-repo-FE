import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  public GROUND_API = 'http://localhost:8080/api/ground/list';
  public EDIT_GROUND_API = 'http://localhost:8080/api/ground/edit';
  private FLOOR_API = 'http://localhost:8080/api/floor';

  constructor(
    public http: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  getAllFloor(): Observable<any> {
    return this.http.get(this.FLOOR_API + '/list', this.httpOptions);
  }

  getAllGround(): Observable<any> {
    return this.http.get(this.GROUND_API);
  }

  findById(id: any): Observable<any> {
    return this.http.get(this.GROUND_API + '/' + id, this.httpOptions);
  }

  updateGround(obj: any, id: string): Observable<any> {
    return this.http.put(this.EDIT_GROUND_API + '/' + id, obj, this.httpOptions);
  }

}
