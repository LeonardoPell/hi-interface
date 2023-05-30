import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro-tabela',
  templateUrl: './filtro-tabela.component.html',
  styleUrls: ['./filtro-tabela.component.scss'],
})
export class FiltroTabelaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  @Input() descricaoBotaoNovo = '';

  @Input() descricaoTitulo = '';

  @Input() rota = '';

  @Input() recebeLista: any = '';

  @Output() valorFiltro: EventEmitter<string> = new EventEmitter<string>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recebeLista.filter = filterValue.trim().toLowerCase();
    this.valorFiltro.emit(filterValue);
  }

  atualizar() {
    location.reload();
  }

  novo() {
    this.router.navigate([this.rota]);
  }
}
