import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';

import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private route: Router, private signinService: SigninService) {}

  forgetPasswordForm = false;
  loginForm = true;

  user: any;
  showLoading = false;
  //user data
  id: any;
  firstname: any;
  lastname: any;
  role: any;
  email: any;
  username: any;
  token: any;
  address: any;
  phone: any;

  //Signin in Form values
  SigninForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.min(8),
      Validators.max(18),
    ]),
  });

  ForgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {}

  onSignin(data: any) {
    if (this.SigninForm.valid) {
      console.log(data);
      this.showLoading = true;
      this.signinService.Signin(data).subscribe(
        (res) => {
          this.user = res;
          //ecrypt session data
          this.token = CryptoJS.AES.encrypt(
            String(this.user.access_token),
            'private-key'
          ).toString();
          this.id = CryptoJS.AES.encrypt(
            String(this.user.data.id),
            'private-key'
          ).toString();
          this.firstname = CryptoJS.AES.encrypt(
            this.user.data.firstname,
            'private-key'
          ).toString();
          this.lastname = CryptoJS.AES.encrypt(
            this.user.data.lastname,
            'private-key'
          ).toString();
          this.email = CryptoJS.AES.encrypt(
            this.user.data.email,
            'private-key'
          ).toString();
          this.role = CryptoJS.AES.encrypt(
            this.user.data.role,
            'private-key'
          ).toString();
          this.username = CryptoJS.AES.encrypt(
            this.user.data.username,
            'private-key'
          ).toString();
          this.phone = CryptoJS.AES.encrypt(
            this.user.data.phone,
            'private-key'
          ).toString();
          this.address = CryptoJS.AES.encrypt(
            this.user.data.address,
            'private-key'
          ).toString();

          //set session storage data
          sessionStorage.clear();
          sessionStorage.setItem('USSD_T', this.token);
          sessionStorage.setItem('USSD_I', this.id);
          sessionStorage.setItem('USSD_F', this.firstname);
          sessionStorage.setItem('USSD_L', this.lastname);
          sessionStorage.setItem('USSD_E', this.email);
          sessionStorage.setItem('USSD_R', this.role);
          sessionStorage.setItem('USSD_U', this.username);
          sessionStorage.setItem('USSD_P', this.phone);
          sessionStorage.setItem('USSD_A', this.address);
          Swal.fire({
            icon: 'success',
            text: 'Successfully',
            showConfirmButton: false,
            timer: 2000,
            width: 400,
            padding: '3em',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
            background: '#fff',
            backdrop: `rgba(0, 0, 0, 0.377)`,
          });
          console.log('signin user role', this.user.data.role);
          if (this.user.data.role === 'Mechanic') {
            this.route.navigate(['/home/profile']);
          } else if (this.user.data.role === 'Tools Manager') {
            this.route.navigate(['/home/profile']);
          } else {
            this.route.navigate(['/home/dashboard']);
          }
        },
        (error) => {
          this.showLoading = false;
          Swal.fire({
            icon: 'error',
            text: `${error.error.message}`,
            showConfirmButton: false,
            timer: 2000,
            width: 300,
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });
        }
      );
    }
  }

  getForgetPasswordForm() {
    if (this.forgetPasswordForm === false) {
      this.forgetPasswordForm = true;
      this.loginForm = false;
    } else {
      this.forgetPasswordForm = false;
      this.loginForm = true;
    }
  }

  verifyEmail(data: any) {
    console.log(data);
    this.showLoading = true;
    this.signinService.verifyEmail(data).subscribe(
      (res) => {
        if (res) {
          this.showLoading = false;
          this.forgetPasswordForm = false;
          this.loginForm = true;
        }
      },
      (error) => {
        this.showLoading = false;
        alert(error.error.message);
      }
    );
  }
}
