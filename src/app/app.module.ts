import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { SigninComponent } from './Component/signin/signin.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { PurchaseComponent } from './Component/purchase/purchase.component';
import { ApplianceComponent } from './Component/appliance/appliance.component';
import { StockComponent } from './Component/stock/stock.component';
import { UsersComponent } from './Component/users/users.component';
import { ReturnedComponent } from './Component/returned/returned.component';
import { DemandComponent } from './Component/demand/demand.component';
import { RequestComponent } from './Component/request/request.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { DataTablesModule } from 'angular-datatables';
import { NewReturned } from './Component/returned/model/new-returned.class';
import { NewParts } from './Component/purchase/model/new-spare-parts.class';
import { NewPurchase } from './Component/purchase/model/new-purchase.class';
import { UpdateParts } from './Component/purchase/model/update-spare-parts.class';
import { NewTools } from './Component/purchase/model/new-tool.class';
import { PendingRequestComponent } from './Component/request/pending-request/pending-request.component';
import { ApprovedRequestComponent } from './Component/request/approved-request/approved-request.component';
import { RejectedRequestComponent } from './Component/request/rejected-request/rejected-request.component';
import { AllRequestComponent } from './Component/request/all-request/all-request.component';
import { UpdateRequest } from './Component/request/pending-request/models/update-request.class';
import { PendingDemandComponent } from './Component/demand/pending-demand/pending-demand.component';
import { ReturnedDemandComponent } from './Component/demand/returned-demand/returned-demand.component';
import { TakenDemandComponent } from './Component/demand/taken-demand/taken-demand.component';
import { UpdateDemand } from './Component/demand/pending-demand/model/update-demand.class';
import { MyRequestComponent } from './Component/my-request/my-request.component';
import { MyApplianceComponent } from './Component/my-appliance/my-appliance.component';
import { NewRequest } from './Component/my-request/models/new-request.class';
import { NewDemand } from './Component/my-appliance/model/new-deamand.class';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ForgetComponent } from './Component/forget/forget.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    DashboardComponent,
    PurchaseComponent,
    ApplianceComponent,
    StockComponent,
    UsersComponent,
    ReturnedComponent,
    DemandComponent,
    RequestComponent,
    ProfileComponent,
    PendingRequestComponent,
    ApprovedRequestComponent,
    RejectedRequestComponent,
    AllRequestComponent,
    PendingDemandComponent,
    ReturnedDemandComponent,
    TakenDemandComponent,
    MyRequestComponent,
    MyApplianceComponent,
    ForgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,
    NgApexchartsModule,
  ],
  providers: [
    NewReturned,
    NewParts,
    NewPurchase,
    UpdateDemand,
    UpdateParts,
    NewTools,
    UpdateRequest,
    NewRequest,
    NewDemand,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
