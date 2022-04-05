import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroundDTO} from '../dto/GroundDTO';
import {Observable} from 'rxjs';
import {GroundCreateDTO} from '../dto/GroundCreateDTO';
import {EMPTY} from 'rxjs';


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

  addNewGround(groundDto: GroundCreateDTO): Observable<GroundCreateDTO> {
    return this.http.post<GroundCreateDTO>(this.GROUND_API + '/create', JSON.stringify(groundDto), this.httpOptions);
  }

  getAllGround(page: number, size:number): Observable<any> {
    return this.http.get(this.GROUND_API +'/list'+'?page=' + page + "&size=" + size);
  }

  searchGround(id: string, type: string, page: number): Observable<any> {
    return this.http.get(this.GROUND_API +'/list'+'?id=' + id + '&groundType=' + type + '&page=' + page);
  }
  deleteGroundById(deleteId: string) {
    return this.http.delete(this.GROUND_API + '/delete/' + deleteId);
  }
}
