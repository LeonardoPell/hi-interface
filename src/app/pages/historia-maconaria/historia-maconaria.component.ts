import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historia-maconaria',
  templateUrl: './historia-maconaria.component.html',
  styleUrls: ['./historia-maconaria.component.scss']
})
export class HistoriaMaconariaComponent implements OnInit {

  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

}
