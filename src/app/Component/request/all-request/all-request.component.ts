import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.css'],
})
export class AllRequestComponent implements OnInit {
  allRequest: any;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: ['colvis', 'copy', 'print', 'excel'],
      responsive: true,
    };
    this.getAllRequest();
  }

  getAllRequest() {
    this.requestService.getAllRequest().subscribe((res) => {
      this.allRequest = res;
      console.log(res);
      this.dtTrigger.next(null);
    });
  }
}
