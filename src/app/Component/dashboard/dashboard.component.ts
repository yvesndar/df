import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  getFields(input: any, field: any) {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  }

  //Request
  thisMonthAllRequest: any;
  thisMonthApprovedRequest: any;
  thisMonthRejectedRequest: any;
  thisMonthPendingRequest: any;

  monthlyAllRequestData: any;
  monthlyAllRequestMonth: any;

  monthlyApprovedData: any;
  monthlyApprovedMonth: any;
  monthlyPendingData: any;
  monthlyPendingMonth: any;
  monthlyRejectedData: any;
  monthlyRejectedMonth: any;

  // Purchase
  purchaseMonthlycount: any;
  purchaseMonthlyMonth: any;
  thisMonthPurchasesCount: any;
  thisMonthPurchasesTotal: any;
  purchaseMonthlyExpenseAmount: any;
  purchaseMonthlyExpenseMonth: any;

  // Recent
  recent: any;
  // Returned
  thisMonthReturnCount: any;
  thisMonthReturnQuantity: any;

  // Chart Declaration
  requestMonthlyChartOptions!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
  };

  purchaseMonthlyChartOptions!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
  };

  purchaseMonthlyExpenseChartOptions!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      // pageLength: false,
      // pageSearch: false,
      dom: '',
      responsive: true,
    };
    this.getThisMonthAllApprovedRequest();
    this.getThisMonthAllRejectedRequest();
    this.getThisMonthAllPendingRequest();
    this.getThisMonthAllRequest();
    this.getMonthlyChartData();
    this.getThisMonthPurchases();
    this.getMonthlyPurchases();
    this.getMonthlyPurchasesExpense();
    this.getThisMonthReturned();
    this.getRecentRequest();
    // this.getMonthlyApprovedyChartData();
    // this.getMonthlyRejectedChartData();
    // this.getMonthlyPendingChartData();
  }

  getThisMonthAllRequest() {
    this.dashboardService.getThisMonthAllRequest().subscribe((res) => {
      this.thisMonthAllRequest = Object.keys(res).length;
    });
  }

  getThisMonthAllApprovedRequest() {
    this.dashboardService.getThisMonthAllApprovedRequest().subscribe((res) => {
      this.thisMonthApprovedRequest = Object.keys(res).length;
    });
  }

  getThisMonthAllRejectedRequest() {
    this.dashboardService.getThisMonthAllRejectedRequest().subscribe((res) => {
      this.thisMonthRejectedRequest = Object.keys(res).length;
    });
  }

  getThisMonthAllPendingRequest() {
    this.dashboardService.getThisMonthAllPendingRequest().subscribe((res) => {
      this.thisMonthPendingRequest = Object.keys(res).length;
    });
  }

  getRecentRequest() {
    this.dashboardService.getRecentRequest().subscribe((res) => {
      console.log('recent', res);
      this.dtTrigger.next(null);
      this.recent = res;
    });
  }

  // Monthly chart Request
  getMonthlyChartData() {
    this.dashboardService.getMonthlyAllRequestCharts().subscribe((res) => {
      function getFields(input: any, field: any) {
        var output = [];
        for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
        return output;
      }
      this.monthlyAllRequestData = getFields(res, 'count').map(Number);
      this.monthlyAllRequestMonth = getFields(res, 'month');
      this.requestMonthlyChartOptions = {
        series: [
          {
            name: 'Request',
            data: this.monthlyAllRequestData,
          },
        ],
        chart: {
          type: 'bar',
          height: 250,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: this.monthlyAllRequestMonth,
        },
        yaxis: {
          title: {
            text: 'Monthly Request',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + ' Request';
            },
          },
        },
      };
    });
  }

  getThisMonthPurchases() {
    this.dashboardService.getThisMonthPurchases().subscribe((res) => {
      function getFields(input: any, field: any) {
        var output = [];
        for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
        return output;
      }
      this.thisMonthPurchasesCount = getFields(res, 'count').map(Number);
      this.thisMonthPurchasesTotal = getFields(res, 'sum').map(Number);
    });
  }

  getMonthlyPurchases() {
    this.dashboardService.getMonthlyPurchasesNumber().subscribe((res) => {
      function getFields(input: any, field: any) {
        var output = [];
        for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
        return output;
      }
      this.purchaseMonthlycount = getFields(res, 'count').map(Number);
      this.purchaseMonthlyMonth = getFields(res, 'month');
      this.purchaseMonthlyChartOptions = {
        series: [
          {
            name: 'Request',
            data: this.purchaseMonthlycount,
          },
        ],
        chart: {
          type: 'bar',
          height: 250,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: this.purchaseMonthlyMonth,
        },
        yaxis: {
          title: {
            text: 'Monthly Request',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + ' Request';
            },
          },
        },
      };
    });
  }

  getMonthlyPurchasesExpense() {
    this.dashboardService.getMonthlyPurchases().subscribe((res) => {
      this.purchaseMonthlyExpenseAmount = this.getFields(res, 'sum').map(
        Number
      );
      this.purchaseMonthlyExpenseMonth = this.getFields(res, 'month');
      this.purchaseMonthlyExpenseChartOptions = {
        series: [
          {
            name: 'Request',
            data: this.purchaseMonthlyExpenseAmount,
          },
        ],
        chart: {
          type: 'bar',
          height: 250,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: this.purchaseMonthlyExpenseMonth,
        },
        yaxis: {
          title: {
            text: 'Monthly Request',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + ' Request';
            },
          },
        },
      };
    });
  }

  getThisMonthReturned() {
    this.dashboardService.getThisMonthReturned().subscribe((res) => {
      this.thisMonthReturnCount = this.getFields(res, 'count').map(Number);
      this.thisMonthReturnQuantity = this.getFields(res, 'quantity').map(
        Number
      );
      console.log(res);
    });
  }
}
