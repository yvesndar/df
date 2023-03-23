import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { URL } from 'src/app/url.constant';
@Injectable({
  providedIn: 'root',
})
export class DemandService {
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

  verifyTool(data: any) {
    return this.http.get(`${URL}/tools/item/${data}`);
  }

  onSubmit(data: any) {
    return this.http.post(`${URL}/demand/new`, data, {
      headers: this.header,
    });
  }

  getAllPendingRequest() {
    return this.http.get(`${URL}/demand/allPending`, {
      headers: this.header,
    });
  }

  getAllApprovedRequest() {
    return this.http.get(`${URL}/demand/allApproved`, {
      headers: this.header,
    });
  }

  getAllReturnedRequest() {
    return this.http.get(`${URL}/demand/allReturned`, {
      headers: this.header,
    });
  }

  getApproveStatus(data: any) {
    return this.http.put(`${URL}/demand/approve/${data.partNumber}`, data, {
      headers: this.header,
    });
  }

  getReturnStatus(data: any) {
    return this.http.put(`${URL}/demand/return/${data.partNumber}`, data, {
      headers: this.header,
    });
  }
}
