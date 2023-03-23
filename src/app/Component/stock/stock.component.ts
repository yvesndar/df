import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  parts: any;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private stockService: StockService) {}
  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      // Configure the buttons
      buttons: [
        // 'columnsToggle',
        'colvis',
        'copy',
        'print',
        'excel',
        // {
        //   text: 'Some button',
        //   key: '1',
        //   action: function (e: any, dt: any, node: any, config: any) {
        //     alert('Button activated');
        //   },
        // },
      ],
      responsive: true,
    };
    this.allSpareParts();
  }

  allSpareParts() {
    this.stockService.getAllParts().subscribe((res) => {
      console.log(res);
      this.dtTrigger.next(null);
      this.parts = res;
    });
  }
}
