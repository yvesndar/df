import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DemandService } from '../demand.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-taken-demand',
  templateUrl: './taken-demand.component.html',
  styleUrls: ['./taken-demand.component.css'],
})
export class TakenDemandComponent implements OnInit {
  constructor(private demandService: DemandService) {}
  //For table
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  takenTool: any;

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getAllTakenTools();
  }

  getAllTakenTools() {
    this.demandService.getAllApprovedRequest().subscribe((res) => {
      this.takenTool = res;
      this.dtTrigger.next(null);
    });
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
      this.getAllTakenTools();
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
