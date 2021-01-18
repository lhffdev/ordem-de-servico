import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';
import { OrdemDeServicoFormComponent } from 'src/app/pages/ordem-de-servico/components/ordem-de-servico-form.component';

@Component({
  selector: 'app-ordem-de-servico-new',
  templateUrl: './ordem-de-servico-new.component.html'
})
export class OrdemDeServicoNewComponent implements OnInit {

  @ViewChild(ModalAlertComponent)
  private modalAlertComponent: ModalAlertComponent;

  @ViewChild(OrdemDeServicoFormComponent)
  private ordemDeServicoFormComponent: OrdemDeServicoFormComponent;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    setTimeout(() => this.ordemDeServicoFormComponent.startForm(), 0);
  }

  salvar(ordemDeServico) {
    this.ordemDeServicoFormComponent.formSubmitted = true;

    if (!this.ordemDeServicoFormComponent.formOrdemDeServico.valid) {
      return;
    }

    this.ordemDeServicoFormComponent.habilitarLoadBotaoSalvar = true;

    this.apiService.post('ordem_servicos', ordemDeServico).then(response => {
      this.router.navigate([`ordem-de-servico/${response['ordemServicoId']}`])
    })
    .catch(error => {
      this.ordemDeServicoFormComponent.formSubmitted = false;
      this.modalAlertComponent.show(error.error);
    });
  }
}
