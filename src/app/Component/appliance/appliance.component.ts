import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApplianceService } from './appliance.service';

@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.component.html',
  styleUrls: ['./appliance.component.css'],
})
export class ApplianceComponent implements OnInit {
  appliance: any;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private applianceSer: ApplianceService) {}

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      buttons: [
        'colvis',
        'copy',
        'print',
        'excel',
        {
          text: 'Some button',
          key: '1',
          action: function (e: any, dt: any, node: any, config: any) {
            alert('Button activated');
          },
        },
      ],
      responsive: true,
    };
    this.allTools();
  }

  allTools() {
    this.applianceSer.getAllTools().subscribe((res) => {
      console.log(res);
      this.appliance = res;
      this.dtTrigger.next(null);
    });
  }
}
