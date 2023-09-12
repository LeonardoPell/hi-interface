import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingService } from 'src/app/api/loading/loading.service';
import { jsPDF } from 'jspdf';
import { AtaReuniao } from 'src/app/core/interface/ata-reuniao/ata-reuniao.model';
import { AtaReuniaoService } from 'src/app/api/ata-reuniao/ata-reuniao.model';

@Component({
  selector: 'app-pdf-ata',
  templateUrl: './pdf-ata.component.html',
  styleUrls: ['./pdf-ata.component.scss']
})
export class PdfAtaComponent implements OnInit, OnDestroy {

  ataReuniao: AtaReuniao = {
    titulo: '',
    descricao: '',
    reuniao: 0
  }

  sub: Subscription[] = [];

  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private readonly _ataReuniaoService: AtaReuniaoService
  ) { }

  ngOnInit(): void {
    const id_reuniao = this.route.snapshot.paramMap.get('reuniao');
    this.sub.push(
      this._ataReuniaoService.retornaAtaPorIdReuniao(Number(id_reuniao)).subscribe(ataReuniao => {
        this.ataReuniao = ataReuniao;
      })
    );
  }

  geraPdf(){
    this.loadingService.show();
    const doc = new jsPDF('l','pt','a3');
    doc.html(this.el.nativeElement, {
      callback: pdf => {
        pdf.save("ata.pdf");
        this.loadingService.hide();
      }
    });
  }

  cancelar(){
    this.router.navigate(['eventos']);
    return;
  }

  ngOnDestroy() {
    this.sub.map((s) => s.unsubscribe());
  }

}
