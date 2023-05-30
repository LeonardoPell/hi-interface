import { Component, OnInit } from '@angular/core';
import { dadosMenu } from './data-menu';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss']
})
export class SidenavBarComponent implements OnInit {

  menuList: any[] = [];
  acessoMenuChildren: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
    dadosMenu.map((menu) => {
      this.menuList.push(menu);
    });
  }

}
