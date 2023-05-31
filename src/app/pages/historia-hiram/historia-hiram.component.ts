import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historia-hiram',
  templateUrl: './historia-hiram.component.html',
  styleUrls: ['./historia-hiram.component.scss']
})
export class HistoriaHiramComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
