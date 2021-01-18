import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';

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
}
