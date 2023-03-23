import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewPurchase } from './model/new-purchase.class';

import * as CryptoJS from 'crypto-js';
import { NewParts } from './model/new-spare-parts.class';
import { NewTools } from './model/new-tool.class';
import { URL } from 'src/app/url.constant';
@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(
    private http: HttpClient,
    private newPart: NewParts,
    private newTool: NewTools
  ) {}

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

  addPurchase(data: any) {
    return this.http.post(`${URL}/purchase/new`, data, {
      headers: this.header,
    });
  }

  addNewParts(data: any) {
    this.newPart.partNumber = data.partNumber;
    this.newPart.serialNumber = data.serialNumber;
    this.newPart.description = data.description;
    this.newPart.new = data.quantity;
    this.newPart.category = data.category;
    this.newPart.receivedBy = Number(this.id);
    return this.http.post(`${URL}/spare-parts/new`, this.newPart, {
      headers: this.header,
    });
  }

  addNewTool(data: any) {
    this.newTool.partNumber = data.partNumber;
    this.newTool.serialNumber = data.serialNumber;
    this.newTool.description = data.description;
    this.newTool.quantity = data.quantity;
    this.newTool.receivedBy = Number(this.id);
    return this.http.post(`${URL}/tools/new`, this.newTool, {
      headers: this.header,
    });
  }

  updateSparePartsQuantity(data: any) {
    this.newPart.partNumber = data.partNumber;
    this.newPart.new = data.quantity;
    return this.http.put(`${URL}/spare-parts/update/new`, this.newPart, {
      headers: this.header,
    });
  }

  updateToolsQuantity(data: any) {
    return this.http.put(`${URL}/tools/update/new`, data, {
      headers: this.header,
    });
  }

  getAllPurchasedItems() {
    return this.http.get(`${URL}/purchase/all`, {
      headers: this.header,
    });
  }

  getMonthlyPurchased() {
    return this.http.get(`${URL}/purchase/monthly`, {
      headers: this.header,
    });
  }

  getMonthlyExpense() {
    return this.http.get(`${URL}/purchase/monthly/expense,{
      headers: this.header,
    }`);
  }

  getThisMonthlyPurchase() {
    return this.http.get(`${URL}/purchase/thismonth`, {
      headers: this.header,
    });
  }
}
