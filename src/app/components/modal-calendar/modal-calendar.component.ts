import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evento } from 'src/app/core/interface/evento/evento.model';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.scss']
})
export class ModalCalendarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evento,
  ) { }

  ngOnInit(): void {
    this.data.data = moment(this.data.data_hora_reuniao).format('DD/MM/YYYY');
    this.data.hora = moment(this.data.data_hora_reuniao).format('LT');
  }

  onNoClick(): void {
    this.close();
  }

  close(){
    this.dialogRef.close();
  }

}
