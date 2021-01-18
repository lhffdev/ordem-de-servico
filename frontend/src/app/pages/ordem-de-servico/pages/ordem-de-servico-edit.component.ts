import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';
import { OrdemDeServicoFormComponent } from 'src/app/pages/ordem-de-servico/components/ordem-de-servico-form.component';

@Component({
  selector: 'app-ordem-de-servico-edit',
  templateUrl: './ordem-de-servico-edit.component.html'
})
export class OrdemDeServicoEditComponent implements OnInit {

  id = this.route.snapshot.params.id;

  @ViewChild(ModalAlertComponent)
  private modalAlertComponent: ModalAlertComponent;

  @ViewChild(OrdemDeServicoFormComponent)
  private ordemDeServicoFormComponent: OrdemDeServicoFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.get(`ordem_servicos/${this.id}`).then(ordemDeServico => {
      this.ordemDeServicoFormComponent.startForm(ordemDeServico);
    });
  }

  salvar(ordemDeServico) {
    this.ordemDeServicoFormComponent.formSubmitted = true;

    if (!this.ordemDeServicoFormComponent.formOrdemDeServico.valid) {
      return;
    }

    this.ordemDeServicoFormComponent.habilitarLoadBotaoSalvar = true;

    this.apiService.patch(`ordem_servicos/${this.id}`, ordemDeServico).then(response => {
      this.router.navigate([`ordem-de-servico/${response['ordemServicoId']}`]);
    })
    .catch(error => {
      this.ordemDeServicoFormComponent.formSubmitted = false;
      this.modalAlertComponent.show(error.error);
    });
  }
}
