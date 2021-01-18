import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-ordem-de-servico-show',
  templateUrl: './ordem-de-servico-show.component.html',
  styleUrls: ['./ordem-de-servico-show.component.css']
})
export class OrdemDeServicoShowComponent implements OnInit {

  id = this.route.snapshot.params.id;
  ordemDeServico;

  @ViewChild(ModalAlertComponent)
  private modalAlertComponent: ModalAlertComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.get(`ordem_servicos/${this.id}`).then(ordensDeServico => {
      this.ordemDeServico = ordensDeServico;
    })
    .catch(error => this.modalAlertComponent.show(error.error));
  }

  voltar() {
    this.router.navigate(['ordem-de-servico']);
  }

  alterar() {
    this.router.navigate([`ordem-de-servico/${this.id}/alterar`]);
  }

  deletarOrdemDeServico() {
    this.apiService.delete(`ordem_servicos/${this.id}`).then(_ => {
      this.voltar();
    })
    .catch(error => this.modalAlertComponent.show(error.error));
  }

  valorTotalExames() {
    return this.ordemDeServico.exames.reduce((sum, exame) => sum + exame.examePreco, 0);
  }

  gerarRelatorio() {
    const data = document.getElementById('relatorio');

    html2canvas(data).then(canvas => {
      const ctx = canvas.getContext('2d');
      ctx.font = '16px sans-serif';
      ctx.fillText(
        'Obs: Para retirar o exame é necessário apresentar o protocolo de atendimento e um documento com foto.',
        69.9,
        545 + this.ordemDeServico.exames.length * 32
      );

      const pdf = new jspdf.jsPDF('p', 'cm', 'a4');
      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(contentDataURL, 'PNG', 0.1, 0.1, 20.8, 9 + this.ordemDeServico.exames.length * 0.71);
      pdf.save('Filename.pdf');
    });
  }
}
