import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { URL } from 'src/app/url.constant';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  token = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_T')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  getThisMonthAllRequest() {
    return this.http.get(`${URL}/request/thisMonthAll`, {
      headers: this.header,
    });
  }

  getThisMonthAllPendingRequest() {
    return this.http.get(`${URL}/request/thisMonthPending`, {
      headers: this.header,
    });
  }

  getThisMonthAllApprovedRequest() {
    return this.http.get(`${URL}/request/thisMonthApproved`, {
      headers: this.header,
    });
  }

  getThisMonthAllRejectedRequest() {
    return this.http.get(`${URL}/request/thisMonthRejected`, {
      headers: this.header,
    });
  }

  getThisMonthAllRequestCharts() {
    return this.http.get(`${URL}/request/thisMonthAllDetails`, {
      headers: this.header,
    });
  }

  getMonthlyAllRequestCharts() {
    return this.http.get(`${URL}/request/monthlyRequest`, {
      headers: this.header,
    });
  }

  getMonthlyAllPendingRequestCharts() {
    return this.http.get(`${URL}/request/monthlyPending`, {
      headers: this.header,
    });
  }

  getMonthlyAllApprovedRequestCharts() {
    console.log('hello 2');
    return this.http.get(`${URL}/request/monthlyApproved`, {
      headers: this.header,
    });
  }

  getMonthlyAllRejectedRequestCharts() {
    return this.http.get(`${URL}/request/monthlyRejected`, {
      headers: this.header,
    });
  }

  getMonthlyPurchases() {
    return this.http.get(`${URL}/purchase/monthlyPurchases`, {
      headers: this.header,
    });
  }

  getMonthlyPurchasesNumber() {
    return this.http.get(`${URL}/purchase/monthlyPurchasesNumber`, {
      headers: this.header,
    });
  }

  getThisMonthPurchases() {
    return this.http.get(`${URL}/purchase/thisMonthPurchases`, {
      headers: this.header,
    });
  }

  getThisMonthReturned() {
    return this.http.get(`${URL}/returned/thismonth`, {
      headers: this.header,
    });
  }

  getRecentRequest() {
    return this.http.get(`${URL}/request/recent`, {
      headers: this.header,
    });
  }
}
