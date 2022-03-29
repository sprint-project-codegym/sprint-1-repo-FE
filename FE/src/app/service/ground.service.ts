import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroundCreateDTO} from '../dto/GroundCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class GroundService {

  private GROUND_API = 'http://localhost:8080/api/manager/ground';
  private FLOOR_API = 'http://localhost:8080/api/manager/floor';

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

  addNewGround(groundDto: GroundCreateDTO): Observable<GroundCreateDTO> {
    return this.http.post<GroundCreateDTO>(this.GROUND_API + '/create', JSON.stringify(groundDto), this.httpOptions);
  }

  getGroundById(id: string): Observable<any> {
    return this.http.get<any>(this.GROUND_API + '/list/' + id, this.httpOptions);
  }

}
