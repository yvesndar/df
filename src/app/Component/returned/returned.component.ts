import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReturnedService } from './returned.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-returned',
  templateUrl: './returned.component.html',
  styleUrls: ['./returned.component.css'],
})
export class ReturnedComponent implements OnInit {
  constructor(private returnService: ReturnedService) {}

  getReturn: any;
  return: any;
  returned: any;
  newReturnedForm = false;
  id = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_I')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  role = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  token = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  NewReturned = new FormGroup({
    partNumber: new FormControl(null, [Validators.required]),
    serialNumber: new FormControl(null, [Validators.required]),
    reason: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    takenAt: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.allReturned();
    if (this.role === 'Mechanic') {
      this.getReturn = true;
    } else {
      this.getReturn = false;
    }
  }

  allReturned() {
    this.returnService.getAllReturned().subscribe((res) => {
      this.return = res;
      this.dtTrigger.next(null);
    });
  }

  removeNewForm() {
    if (this.newReturnedForm === true) {
      this.newReturnedForm = false;
      this.NewReturned.reset();
    } else {
      this.newReturnedForm = true;
      this.NewReturned.reset();
    }
  }

  onSubmit(data: any) {
    console.log(data);
    this.returnService.newReturn(data).subscribe((res) => {
      console.log(res);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        Swal.fire({
          icon: 'success',
          title: `Successfully`,
          text: 'Request has been Sent',
          showConfirmButton: false,
          timer: 1500,
        });
        this.removeNewForm();
        this.allReturned();
      });
    });
  }

  verify(data: any) {
    this.returnService.verify(data.partNumber).subscribe(
      (res) => {
        console.log(res);
        this.returned = res;
        this.NewReturned.setValue({
          partNumber: this.returned.partNumber,
          serialNumber: this.returned.serialNumber,
          reason: null,
          quantity: null,
          takenAt: null,
          date: null,
          description: this.returned.description,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'warning',
          title: `Error`,
          text: `${error.error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
