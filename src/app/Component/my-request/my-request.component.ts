import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import Swal from 'sweetalert2';
import { NewRequest } from './models/new-request.class';
import { MyRequestService } from '../my-request/my-request.service';
@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css'],
})
export class MyRequestComponent implements OnInit {
  constructor(
    private myRequestService: MyRequestService,
    private newRequest: NewRequest
  ) {}

  requestForm = false;
  showCurrentQuantity = false;
  quantityNeeded = false;
  showSubmitButton = false;
  showVerifyButton = true;
  data: any;
  item: any;

  pendingTable = false;
  allTable = false;

  showData: any;

  adminPage = false;
  userPage = false;
  showbutton = true;
  request: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  id = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_I')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);

  role = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);

  RequestForm = new FormGroup({
    partNumber: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    serialNumber: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    description: new FormControl({ value: 'description', disabled: true }, [
      Validators.required,
    ]),
    new: new FormControl({ value: 'category', disabled: true }, [
      Validators.required,
    ]),
    used: new FormControl({ value: 'category', disabled: true }, [
      Validators.required,
    ]),
    neddedNewQuantity: new FormControl(null),
    neddedUsedQuantity: new FormControl(null),
  });

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      // Configure the buttons
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    const myid = this.id;
    this.getAllMyRequest(Number(myid));
  }

  getAllMyRequest(id: number) {
    this.myRequestService.getMyRequest(id).subscribe((res) => {
      this.request = res;
      console.log(res);
      this.dtTrigger.next(null);
    });
  }

  onVerify(data: any) {
    console.log(data);
    this.myRequestService.verifyPartNumber(data).subscribe(
      (res) => {
        this.item = res;
        console.log(this.item);
        this.setFormValue();
        this.showCurrentQuantity = true;
        this.quantityNeeded = true;
        this.showSubmitButton = true;
        this.showVerifyButton = false;
      },
      (error) => {
        if (data === '') {
          Swal.fire({
            icon: 'warning',
            title: `Enter part number to search`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: `Part number ${data} was not found`,
            showConfirmButton: false,
            timer: 2000,
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });
        }
      }
    );
  }

  setFormValue() {
    this.RequestForm.setValue({
      partNumber: this.item.partNumber,
      description: this.item.description,
      new: this.item.new,
      used: this.item.used,
      neddedNewQuantity: null,
      neddedUsedQuantity: null,
      serialNumber: this.item.serialNumber,
    });
  }

  sendRequestItem(data: any) {
    console.log(data);
    this.newRequest.partNumber = data.partNumber;
    this.newRequest.description = this.item.description;
    this.newRequest.category = this.item.category;
    this.newRequest.requestedBy = Number(this.id);
    if (
      data.neddedNewQuantity > this.item.new ||
      data.neddedUsedQuantity > this.item.used
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Entered Qauntity not available',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      this.newRequest.new = data.neddedNewQuantity;
      this.newRequest.used = data.neddedUsedQuantity;

      console.log(this.newRequest);
      Swal.fire({
        title: 'Are you sure you want to send the request?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: `Cancel`,
        confirmButtonColor: 'blue',
        cancelButtonColor: '#d33',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Successfully Sent!', '', 'success');
          this.myRequestService.sendRequest(this.newRequest).subscribe(
            (res) => {
              this.RequestForm.reset();
              this.showCurrentQuantity = false;
              this.showSubmitButton = false;
              this.quantityNeeded = false;
              this.showVerifyButton = true;
              Swal.fire({
                icon: 'success',
                title: `Successfully Sent`,
                text: 'Request has been Sent',
                showConfirmButton: false,
                timer: 2000,
              });
              this.getRequestForm();
              this.rerenderTable(Number(this.id));
            },
            (error) => {
              alert(error.error.message);
            }
          );
        } else if (result.isDenied) {
          Swal.fire('Successfully Cancelled', '', 'info');
        }
      });
    }
  }

  getRequestForm() {
    if (this.requestForm === false) {
      this.requestForm = true;
    } else {
      this.requestForm = false;
    }
  }

  rerenderTable(id: number) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getAllMyRequest(id);
    });
  }
}
