import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-returned-demand',
  templateUrl: './returned-demand.component.html',
  styleUrls: ['./returned-demand.component.css'],
})
export class ReturnedDemandComponent implements OnInit {
  constructor(private demandService: DemandService) {}

  returnedTools: any;
  //For table
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getAllReturnedTools();
  }

  getAllReturnedTools() {
    this.demandService.getAllReturnedRequest().subscribe((res) => {
      this.returnedTools = res;
      this.dtTrigger.next(null);
    });
  }
}
