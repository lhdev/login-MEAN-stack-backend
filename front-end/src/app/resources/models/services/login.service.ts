import { Injectable } from '@angular/core';
import { RequestLogin } from '../Request.login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../ResponseLogin';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private readonly API = 'http://localhost:3000/login'

  constructor(private httpClient: HttpClient) { }

  public Onlogin(requestLogin: RequestLogin): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin> ( 
      'http://localhost:3000/login',
       requestLogin
      );
  }
}
