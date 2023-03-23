import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { URL } from 'src/app/url.constant';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
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

  getAllPendingRequest() {
    return this.http.get(`${URL}/request/allPendingRequest`, {
      headers: this.header,
    });
  }

  getAllRequest() {
    return this.http.get(`${URL}/request/allRequest`, {
      headers: this.header,
    });
  }

  getAllApprovedRequest() {
    return this.http.get(`${URL}/request/allApprovedRequest`, {
      headers: this.header,
    });
  }

  getAllRejectedRequest() {
    return this.http.get(`${URL}/request/allRejectedRequest`, {
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

  approveItem(data: any) {
    return this.http.post(`${URL}/request/approve/${data.id}`, data, {
      headers: this.header,
    });
  }

  rejectItem(data: any) {
    return this.http.post(`${URL}/request/reject/${data.id}`, data, {
      headers: this.header,
    });
  }

  approveItemEmail(data: any) {
    return this.http.post(`${URL}/mail/approvalEmail`, data);
  }

  rejectItemEmail(data: any) {
    return this.http.post(`${URL}/mail/rejectalEmail`, data);
  }
}
