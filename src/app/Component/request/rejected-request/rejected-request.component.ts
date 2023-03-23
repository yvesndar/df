import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-rejected-request',
  templateUrl: './rejected-request.component.html',
  styleUrls: ['./rejected-request.component.css'],
})
export class RejectedRequestComponent implements OnInit {
  constructor(private requestService: RequestService) {}
  allRejected: any;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getAllRejected();
  }

  getAllRejected() {
    this.requestService.getAllRejectedRequest().subscribe((res) => {
      this.allRejected = res;
      this.dtTrigger.next(null);
    });
  }
}
