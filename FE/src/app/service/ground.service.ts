import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {GroundDTO} from '../dto/GroundDTO';

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  public GROUND_API = 'http://localhost:8080/api/manager/ground';

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
    return this.http.get(this.GROUND_API + '/listFloor', this.httpOptions);
  }

  getGroundById(id: string): Observable<any> {
    if (id == null) {
      return EMPTY;
    } else {
      return this.http.get<any>(this.GROUND_API + '/list/' + id, this.httpOptions);
    }
  }

  updateGround(groundDto: GroundDTO, id: string): Observable<GroundDTO> {
    return this.http.put<GroundDTO>(this.GROUND_API + '/edit/' + id, JSON.stringify(groundDto), this.httpOptions);
  }

}
