import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/url.constant';
@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  getAllParts() {
    return this.http.get(`${URL}/spare-parts/all`);
  }
}
