import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  login(body):Observable<any>{  
    return this._http.post('https://localhost:44330/api/Agenda/Login', body);
  }

  register(body):Observable<any>{
    return this._http.post('https://localhost:44330/api/Agenda', body);
  }

  update(body, id):Observable<any>{
    return this._http.put(`https://localhost:44330/api/Agenda/${id}`, body)
  }

}
