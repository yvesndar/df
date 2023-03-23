import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL } from '../../url.constant';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  token = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_T')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  allUsers() {
    return this.http.get(`${URL}/auth/all`, {
      headers: this.header,
    });
  }

  updatedUser(data: any) {
    return this.http.patch(`${URL}/auth/update`, data, {
      headers: this.header,
    });
  }

  createAccount(data: any) {
    return this.http.post(`${URL}/auth/new`, data, {
      headers: this.header,
    });
  }

  sendEmail(data: any) {
    return this.http.post(`${URL}/mail/newUser`, data);
  }
}
