import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosViewComponent } from './eventos-view/eventos-view.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { EventosPresencaComponent } from './eventos-presenca/eventos-presenca.component';
import { EventosRelatorioPresencaComponent } from './eventos-relatorio-presenca/eventos-relatorio-presenca.component';

const routes: Routes = [
  {path: '', component: EventosViewComponent},
  {path: 'create', component: EventosFormComponent},
  {path: 'edit/:id', component: EventosFormComponent},
  {path: 'presenca/:id', component: EventosPresencaComponent},
  {path: 'relatorio/presenca', component: EventosRelatorioPresencaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
