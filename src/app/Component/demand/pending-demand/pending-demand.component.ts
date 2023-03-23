import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-pending-demand',
  templateUrl: './pending-demand.component.html',
  styleUrls: ['./pending-demand.component.css'],
})
export class PendingDemandComponent implements OnInit {
  submitButton = false;
  pendingTool: any;
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

  constructor(private demandService: DemandService) {}
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
    this.allPendingRequest();
  }

  verify(data: any) {
    console.log(data.partNumber);
    this.demandService.verifyTool(data.partNumber).subscribe(
      (res) => {
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

  allPendingRequest() {
    this.demandService.getAllPendingRequest().subscribe((res) => {
      console.log(res);
      this.pendingTool = res;
      this.dtTrigger.next(null);
    });
  }

  resetForm() {
    this.toolRequestForm = false;
    this.ToolRequestForm.reset();
  }

  onApprove(data: any) {
    console.log(data);
    this.demandService.getApproveStatus(data).subscribe(
      (res) => {
        console.log(res);
        this.rerenderTable();
      },
      (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: `${error.error.message}`,
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
      }
    );
  }

  onReturn(data: any) {
    console.log(data);
    this.demandService.getReturnStatus(data).subscribe((res) => {
      console.log(res);
      this.rerenderTable();
    });
  }

  rerenderTable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.allPendingRequest();
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
