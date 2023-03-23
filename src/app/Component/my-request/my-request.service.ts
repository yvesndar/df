import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { URL } from 'src/app/url.constant';
@Injectable({
  providedIn: 'root',
})
export class MyRequestService {
  constructor(private http: HttpClient) {}

  role = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  token = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_T')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  getMyRequest(id: number) {
    return this.http.get(`${URL}/request/all/${id}`, {
      headers: this.header,
    });
  }

  verifyPartNumber(data: any) {
    return this.http.get(`${URL}/spare-parts/item/${data}`);
  }

  sendRequest(data: any) {
    return this.http.post(`${URL}/request/register`, data, {
      headers: this.header,
    });
  }
}
