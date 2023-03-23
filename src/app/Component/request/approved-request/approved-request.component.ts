import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.css'],
})
export class ApprovedRequestComponent implements OnInit {
  allApprovedRequest: any;
  constructor(private requestService: RequestService) {}

  allApproved: any;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getAllApproved();
  }

  getAllApproved() {
    this.requestService.getAllApprovedRequest().subscribe((res) => {
      this.dtTrigger.next(null);
      this.allApproved = res;
    });
  }
}
