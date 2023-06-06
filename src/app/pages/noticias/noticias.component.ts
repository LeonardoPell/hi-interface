import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Subscription } from 'rxjs';
import { EventoService } from 'src/app/api/eventos/eventos.model';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { Evento } from 'src/app/core/interface/evento/evento.model';
import { ModalCalendarComponent } from 'src/app/components/modal-calendar/modal-calendar.component';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit, OnDestroy {

  sub: Subscription[] = [];
  
  @ViewChild('fullcalendar') fullcalendar: any;

  todosEventos: Evento[]
  calendarOptions: CalendarOptions = {
    locale: 'pt-br',
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    eventClick: this.handleEventClick.bind(this),
    eventClassNames: 'event-high',
    buttonText: {
      today: 'Hoje'
    }
  };

  constructor(
    private _eventoService: EventoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sub.push(
      this._eventoService.retornaListaEventos().subscribe(eventos => {
        this.todosEventos = eventos;
        eventos.map(evento => {
          this.fullcalendar.getApi().addEvent({ id: evento.id, title: evento.titulo, date: moment(evento.data_hora_reuniao).format('YYYY-MM-DD') });
        });
      })
    );
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

  handleEventClick(eventClickArg: EventClickArg) {
    const idEvento = eventClickArg.event._def.publicId;
    const evento = this.todosEventos.filter(({id}) => id === Number(idEvento));
    const dialogRef = this.dialog.open(ModalCalendarComponent, {
      data: evento[0],
      minWidth: '60%'
    });
  }

}
