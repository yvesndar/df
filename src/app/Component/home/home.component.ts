import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  constructor(private route: Router) {}

  role = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);

  homeNav = false;
  dashboardNav = false;
  sparePartNav = false;
  spareRequestNav = false;
  toolNav = false;
  toolRequestNav = false;
  purchaseNav = false;
  returnedNav = false;
  userNav = false;
  myToolNav = false;
  myRequestNav = false;
  profileNav = true;

  checkSession() {
    if (sessionStorage.getItem('USSD_T') === null) {
      this.route.navigate(['/auth/signin']);
    }
  }
  ngOnInit(): void {
    this.checkSession();
    this.checkUser();
    console.log('hellooo');
  }

  checkUser() {
    if (this.role === 'Mechanic') {
      this.dashboardNav = false;
      this.sparePartNav = false;
      this.spareRequestNav = false;
      this.toolNav = false;
      this.toolRequestNav = false;
      this.purchaseNav = false;
      this.returnedNav = true;
      this.userNav = false;
      this.myToolNav = true;
      this.myRequestNav = true;
      // this.route.navigate(['/profile']);
    }
    if (this.role === 'Tools Manager') {
      this.dashboardNav = false;
      this.sparePartNav = false;
      this.spareRequestNav = false;
      this.toolNav = true;
      this.toolRequestNav = true;
      this.purchaseNav = true;
      this.returnedNav = false;
      this.userNav = false;
      this.myToolNav = false;
      this.myRequestNav = false;
      // this.route.navigate(['/profile']);
    }
    if (this.role === 'Store Manager') {
      this.dashboardNav = true;
      this.sparePartNav = true;
      this.spareRequestNav = true;
      this.toolNav = false;
      this.toolRequestNav = false;
      this.purchaseNav = true;
      this.returnedNav = true;
      this.userNav = false;
      this.myToolNav = false;
      this.myRequestNav = false;
    }
    if (this.role === 'Super Admin') {
      this.dashboardNav = true;
      this.sparePartNav = true;
      this.spareRequestNav = true;
      this.toolNav = true;
      this.toolRequestNav = true;
      this.purchaseNav = true;
      this.returnedNav = true;
      this.userNav = true;
      this.myToolNav = false;
      this.myRequestNav = false;
    }
    if (this.role === 'IT Support') {
      this.dashboardNav = true;
      this.sparePartNav = true;
      this.spareRequestNav = true;
      this.toolNav = true;
      this.toolRequestNav = true;
      this.purchaseNav = true;
      this.returnedNav = true;
      this.userNav = true;
      this.myToolNav = false;
      this.myRequestNav = false;
    }
  }

  reload() {
    window.location.reload();
  }
}
