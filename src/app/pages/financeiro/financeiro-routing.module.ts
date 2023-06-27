import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceteComponent } from './balancete/balancete.component';

const routes: Routes = [
  {
    path: 'balancete', component: BalanceteComponent
  },
  {
    path: 'balancete/:mes/:ano', component: BalanceteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
