import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/url.constant';

@Injectable({
  providedIn: 'root',
})
export class ForgetService {
  constructor(private http: HttpClient) {}

  resetPassword(data: any) {
    return this.http.put(`${URL}/mail/resetPassword`, data);
  }
}
