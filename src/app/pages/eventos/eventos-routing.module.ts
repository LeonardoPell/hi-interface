import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosViewComponent } from './eventos-view/eventos-view.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';

const routes: Routes = [
  {path: '', component: EventosViewComponent},
  {path: 'create', component: EventosFormComponent},
  {path: 'edit/:id', component: EventosFormComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
