import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { URL } from 'src/app/url.constant';
import { NewReturned } from './model/new-returned.class';
@Injectable({
  providedIn: 'root',
})
export class ReturnedService {
  id = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_I')),
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
  constructor(private http: HttpClient, private newReturned: NewReturned) {}

  getAllReturned() {
    return this.http.get(`${URL}/returned/all`, {
      headers: this.header,
    });
  }

  newReturn(data: any) {
    this.newReturned.partNumber = data.partNumber;
    this.newReturned.serialNumber = data.serialNumber;
    this.newReturned.reason = data.reason;
    this.newReturned.quantity = data.quantity;
    this.newReturned.takenAt = data.takenAt;
    this.newReturned.requestedBy = Number(this.id);
    return this.http.post(`${URL}/returned/new`, this.newReturned, {
      headers: this.header,
    });
  }

  verify(data: any) {
    return this.http.get(`${URL}/spare-parts/item/${data}`);
  }

  getThisMonthReturned() {
    return this.http.get(`${URL}/returned/thismonth`);
  }
}
