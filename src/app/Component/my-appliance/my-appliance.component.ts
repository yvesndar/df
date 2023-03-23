import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

import Swal from 'sweetalert2';
import { MyApplianceService } from './my-appliance.service';
import { NewDemand } from './model/new-deamand.class';
@Component({
  selector: 'app-my-appliance',
  templateUrl: './my-appliance.component.html',
  styleUrls: ['./my-appliance.component.css'],
})
export class MyApplianceComponent implements OnInit {
  submitButton = true;
  toolRequestForm = false;
  item: any;

  //For table
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  ToolRequestForm = new FormGroup({
    partNumber: new FormControl(null, [Validators.required]),
    serialNumber: new FormControl({ value: 'Serial Number', disabled: true }, [
      Validators.required,
    ]),
    description: new FormControl({ value: 'Description', disabled: true }, [
      Validators.required,
    ]),
    quantity: new FormControl(null, [Validators.required]),
    returnDate: new FormControl(null, [Validators.required]),
  });

  role = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_R')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);
  id = CryptoJS.AES.decrypt(
    String(sessionStorage.getItem('USSD_I')),
    'private-key'
  ).toString(CryptoJS.enc.Utf8);

  constructor(
    private myApplianceService: MyApplianceService,
    private newDemand: NewDemand
  ) {}
  requestForm() {
    if (this.toolRequestForm === false) {
      this.toolRequestForm = true;
      this.ToolRequestForm.reset();
    } else {
      this.toolRequestForm = false;
      this.ToolRequestForm.reset();
    }
  }
  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getMyTools();
  }

  verify(data: any) {
    this.myApplianceService.verifyTool(data.partNumber).subscribe(
      (res) => {
        console.log(res);
        this.item = res;
        this.submitButton = true;
        this.setFormValue(this.item);
      },
      (error) => {
        if (data.partNumber === null) {
          Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: `Enter Tool number to search`,
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
            title: 'Not Found',
            text: `Part number ${data.partNumber} was not found`,
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

  setFormValue(data: any) {
    this.ToolRequestForm.setValue({
      partNumber: data.partNumber,
      serialNumber: data.serialNumber,
      description: data.description,
      returnDate: null,
      quantity: null,
    });
  }

  getMyTools() {
    this.myApplianceService.getMyTools().subscribe((res) => {
      this.item = res;
      this.dtTrigger.next(null);
    });
  }

  onSubmit(data: any) {
    (this.newDemand.partNumber = data.partNumber),
      (this.newDemand.description = this.item.description),
      (this.newDemand.serialNumber = this.item.serialNumber),
      (this.newDemand.returnedAt = data.returnDate),
      (this.newDemand.quantity = data.quantity),
      (this.newDemand.demandedBy = Number(this.id)),
      console.log(this.newDemand);
    this.myApplianceService.onSubmit(this.newDemand).subscribe((res: any) => {
      console.log(res);
      this.resetForm();
      this.rerenderTable();
    });
  }

  resetForm() {
    this.toolRequestForm = false;
    this.ToolRequestForm.reset();
  }

  rerenderTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getMyTools();
      Swal.fire({
        icon: 'success',
        text: 'Updated Successfully',
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
    });
  }
}
