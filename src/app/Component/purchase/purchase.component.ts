import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

import * as CryptoJS from 'crypto-js';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { NewPurchase } from './model/new-purchase.class';
import { NewParts } from './model/new-spare-parts.class';
import { PurchaseService } from './purchase.service';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  purchases: any;

  partNumber: any;
  serialNumber: any;
  description: any;
  purchaseOrderNumber: any;
  quantity: any;
  pricePerUnit: any;
  invoiceNumber: any;
  packing: any;
  currency: any;
  exchange: any;
  total: any;
  date: any;
  vname: any;
  vaddress: any;

  answer: any;
  purchaseForm = false;
  purchaseInvoice = false;

  //For table
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  role = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  id = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_I')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);

  subscription!: Subscription;

  PurchaseForm = new FormGroup({
    partNumber: new FormControl(null, [Validators.required]),
    serialNumber: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    purchaseOrderNumber: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    pricePerUnit: new FormControl(null, [Validators.required]),
    invoiceNumber: new FormControl(null, [Validators.required]),
    packing: new FormControl(null, [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    exchange: new FormControl(null, [Validators.required]),
    vname: new FormControl(null, [Validators.required]),
    vaddress: new FormControl(null, [Validators.required]),
    shelflife: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
  });
  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    console.log('purchase');
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getAllPurchase();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addNewPurchase(data: any) {
    if (this.role === 'Store Manager' && data.category === 'Spare Parts') {
      this.purchaseService.addPurchase(data).subscribe((res) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.purchaseForm = false;
          this.PurchaseForm.reset();
          this.getAllPurchase();
          if (res === true) {
            this.purchaseService
              .updateSparePartsQuantity(data)
              .subscribe((res) => {
                Swal.fire({
                  icon: 'success',
                  title: `Successfully Sent`,
                  text: 'Spare Parts Updated',
                  showConfirmButton: false,
                  timer: 2000,
                });
                return res;
              });
          } else {
            this.purchaseService.addNewParts(data).subscribe((res) => {
              Swal.fire({
                icon: 'success',
                title: `Successfully Sent`,
                text: 'New Spare Parts Added',
                showConfirmButton: false,
                timer: 2000,
              });
              return res;
            });
          }
        });
      });
    }
    if (this.role === 'Tools Manager' && data.category === 'Tools') {
      this.purchaseService.addPurchase(data).subscribe((res) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.purchaseForm = false;
          this.PurchaseForm.reset();
          this.getAllPurchase();
          if (res === true) {
            this.purchaseService.updateToolsQuantity(data).subscribe((res) => {
              Swal.fire({
                icon: 'success',
                title: `Successfully Sent`,
                text: 'Tools Updated',
                showConfirmButton: false,
                timer: 2000,
              });
              return res;
            });
          } else {
            this.purchaseService.addNewTool(data).subscribe((res) => {
              Swal.fire({
                icon: 'success',
                title: `Successfully Sent`,
                text: 'New Tools Added',
                showConfirmButton: false,
                timer: 2000,
              });
              return res;
            });
          }
        });
      });
    }
  }

  getAllPurchase() {
    this.subscription = this.purchaseService
      .getAllPurchasedItems()
      .subscribe((res) => {
        this.dtTrigger.next(null);
        this.purchases = res;
      });
  }

  monthDiff(date2: any) {
    const expirationDate = new Date(date2);
    const todayDate = new Date();
    var months: number;
    months = (expirationDate.getFullYear() - todayDate.getFullYear()) * 12;
    months -= todayDate.getMonth();
    months += expirationDate.getMonth();
    this.answer = months <= 0 ? 0 : months;
    return this.answer;
  }

  newPurchaseForm() {
    this.PurchaseForm.reset();
    if (this.purchaseForm === true) {
      this.purchaseForm = false;
    } else {
      this.purchaseForm = true;
    }
  }
}
