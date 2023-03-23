import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { URL } from 'src/app/url.constant';
import { ForgetService } from './forget.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent implements OnInit {
  constructor(private forgetService: ForgetService, private route: Router) {}

  password = false;
  confirm = false;
  showLoading = false;

  ForgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirm: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {}

  resetPassword(data: any) {
    console.log(data);
    this.showLoading = true;
    this.forgetService.resetPassword(data).subscribe((res) => {
      this.showLoading = false;
      this.route.navigate(['/auth/signin']);
    });
  }
}
