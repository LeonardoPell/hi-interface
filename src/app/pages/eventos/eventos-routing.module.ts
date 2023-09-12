import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosViewComponent } from './eventos-view/eventos-view.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { EventosPresencaComponent } from './eventos-presenca/eventos-presenca.component';
import { EventosRelatorioPresencaComponent } from './eventos-relatorio-presenca/eventos-relatorio-presenca.component';
import { EventosAtaComponent } from './eventos-ata/eventos-ata.component';
import { PdfAtaComponent } from './pdf-ata/pdf-ata.component';

const routes: Routes = [
  {path: '', component: EventosViewComponent},
  {path: 'create', component: EventosFormComponent},
  {path: 'edit/:id', component: EventosFormComponent},
  {path: 'presenca/:id', component: EventosPresencaComponent},
  {path: 'relatorio/presenca', component: EventosRelatorioPresencaComponent},
  {path: 'ata/:reuniao', component: EventosAtaComponent},
  {path: 'ata/pdf/:reuniao', component: PdfAtaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
