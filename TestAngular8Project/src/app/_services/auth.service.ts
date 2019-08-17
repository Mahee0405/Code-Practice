import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:44350/api/auth/';
  jwtHelper = new JwtHelperService();
  decodeToken : any;
  constructor(private http: HttpClient) {}

  register(model: any) {
    console.log(model);
    return this.http.post(this.baseUrl + 'register', model);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  loggin() {
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }
}
