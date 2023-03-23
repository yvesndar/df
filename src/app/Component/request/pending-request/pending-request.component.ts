import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UpdateRequest } from './models/update-request.class';
import * as CryptoJS from 'crypto-js';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css'],
})
export class PendingRequestComponent implements OnInit {
  requestForm = false;
  showCurrentQuantity = false;
  quantityNeeded = false;
  showSubmitButton = false;
  showVerifyButton = true;
  data: any;
  item: any;

  allPendingRequest: any;
  approvedTable = false;
  allApprovedRequest: any;
  allRequest: any;
  allRejectedRequest: any;

  pendingTable = false;
  allTable = false;

  showData: any;

  adminPage = false;
  userPage = false;
  showbutton = true;

  //For table
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

  constructor(
    private updateRequest: UpdateRequest,
    private http: HttpClient,
    private requestService: RequestService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getAllPendingRequest();
    this.getAllApproved();
    this.getAllRejected();
    this.getAllRequest();
  }

  onVerify(data: any) {
    console.log(data);
    this.requestService.verifyPartNumber(data).subscribe(
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

  getRequestForm() {
    if (this.requestForm === false) {
      this.requestForm = true;
    } else {
      this.requestForm = false;
    }
  }

  removeRequestForm() {
    this.requestForm = false;
    this.showCurrentQuantity = false;
    this.showSubmitButton = false;
    this.quantityNeeded = false;
    this.showVerifyButton = true;
    this.RequestForm.reset();
  }

  getAllPendingRequest() {
    this.requestService.getAllPendingRequest().subscribe((res) => {
      this.allPendingRequest = res;
      this.adminPage = true;
      this.userPage = false;
      this.dtTrigger.next(null);
    });
  }

  getAllRequest() {
    this.requestService.getAllRequest().subscribe((res) => {
      console.log('all request', res);
      this.allRequest = res;
    });
  }

  getAllApproved() {
    this.requestService.getAllApprovedRequest().subscribe((res) => {
      console.log(res);
      this.allApprovedRequest = res;
    });
  }

  getAllRejected() {
    this.requestService.getAllRejectedRequest().subscribe((res) => {
      this.allRejectedRequest = res;
    });
  }

  approveItem(data: any) {
    console.log(data);
    this.updateRequest.id = data.id;
    this.updateRequest.partNumber = data.partNumber;
    this.updateRequest.description = data.description;
    this.updateRequest.new = data.new;
    this.updateRequest.used = data.used;
    this.updateRequest.requestedBy = data.requestedBy.id;
    this.updateRequest.updatedBy = Number(this.id);
    console.log(this.updateRequest);

    Swal.fire({
      title: 'Are you sure you want to approve the request?',
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
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.requestService.approveItem(data).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: `Approved`,
              text: 'Request has been Approved',
              showConfirmButton: false,
              timer: 1500,
            });
            this.rerenderTable();
            this.requestService
              .approveItemEmail(this.updateRequest)
              .subscribe((res) => {
                return res;
              });
            return res;
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: `${error.error.message}`,
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
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'error',
          title: `Canceled`,
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
    });
  }

  rejectItem(data: any) {
    this.updateRequest.id = data.id;
    this.updateRequest.partNumber = data.partNumber;
    this.updateRequest.description = data.description;
    this.updateRequest.new = data.new;
    this.updateRequest.used = data.used;
    this.updateRequest.requestedBy = data.requestedBy;
    this.updateRequest.updatedBy = Number(this.id);

    console.log('update', this.updateRequest);

    Swal.fire({
      title: 'Are you sure you want to reject the request?',
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
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.requestService.rejectItem(this.updateRequest).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: `Rejected`,
              text: 'Request has been Rejected',
              showConfirmButton: false,
              timer: 2000,
            });
            this.rerenderTable();
            this.requestService
              .rejectItemEmail(this.updateRequest)
              .subscribe((res) => {
                return res;
              });

            return res;
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: `${error.error.message}`,
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
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'warning',
          title: `Canceled`,
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
    });
  }

  rerenderTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getAllPendingRequest();
    });
  }
}
