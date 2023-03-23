import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplianceComponent } from './Component/appliance/appliance.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { DemandComponent } from './Component/demand/demand.component';
import { PendingDemandComponent } from './Component/demand/pending-demand/pending-demand.component';
import { ReturnedDemandComponent } from './Component/demand/returned-demand/returned-demand.component';
import { TakenDemandComponent } from './Component/demand/taken-demand/taken-demand.component';
import { ForgetComponent } from './Component/forget/forget.component';
import { HomeComponent } from './Component/home/home.component';
import { MyApplianceComponent } from './Component/my-appliance/my-appliance.component';
import { MyRequestComponent } from './Component/my-request/my-request.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { PurchaseComponent } from './Component/purchase/purchase.component';
import { AllRequestComponent } from './Component/request/all-request/all-request.component';
import { ApprovedRequestComponent } from './Component/request/approved-request/approved-request.component';
import { PendingRequestComponent } from './Component/request/pending-request/pending-request.component';
import { RejectedRequestComponent } from './Component/request/rejected-request/rejected-request.component';
import { RequestComponent } from './Component/request/request.component';
import { ReturnedComponent } from './Component/returned/returned.component';
import { SigninComponent } from './Component/signin/signin.component';
import { StockComponent } from './Component/stock/stock.component';
import { UsersComponent } from './Component/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'auth/signin',
    component: SigninComponent,
  },
  {
    path: 'auth/resetpassword',
    component: ForgetComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'stock',
        component: StockComponent,
      },
      {
        path: 'appliance',
        component: ApplianceComponent,
      },
      {
        path: 'demand',
        component: DemandComponent,
        children: [
          {
            path: 'pending',
            component: PendingDemandComponent,
          },
          {
            path: 'returned',
            component: ReturnedDemandComponent,
          },
          {
            path: 'taken',
            component: TakenDemandComponent,
          },
        ],
      },
      {
        path: 'request',
        component: RequestComponent,
        children: [
          {
            path: 'pending',
            component: PendingRequestComponent,
          },
          {
            path: 'approved',
            component: ApprovedRequestComponent,
          },
          {
            path: 'rejected',
            component: RejectedRequestComponent,
          },
          {
            path: 'all',
            component: AllRequestComponent,
          },
        ],
      },
      {
        path: 'returned',
        component: ReturnedComponent,
      },
      {
        path: 'my-request',
        component: MyRequestComponent,
      },
      {
        path: 'my-appliance',
        component: MyApplianceComponent,
      },
      {
        path: 'purchase',
        component: PurchaseComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
