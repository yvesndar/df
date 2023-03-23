import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/url.constant';

@Injectable({
  providedIn: 'root',
})
export class ApplianceService {
  constructor(private http: HttpClient) {}

  getAllTools() {
    return this.http.get(`${URL}/tools/all`);
  }
}
