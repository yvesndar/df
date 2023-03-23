import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private route: Router) {}
  id = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_I')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  firstname = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_F')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  lastname = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_L')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  role = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  email = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_E')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  username = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_U')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  phone = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_P')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  address = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_A')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);

  secretKey = 'akagera';

  token = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_T')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  ngOnInit(): void {}

  async logOut() {
    sessionStorage.clear();
    this.route.navigate(['auth/signin']);
  }
}
