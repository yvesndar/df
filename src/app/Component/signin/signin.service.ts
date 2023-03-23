import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../url.constant';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private http: HttpClient) {}

  Signin(data: any) {
    return this.http.post(`${URL}/auth/login`, data);
  }

  verifyEmail(data: any) {
    return this.http.post(`${URL}/mail/forgetPasswordemail`, data);
  }
}
