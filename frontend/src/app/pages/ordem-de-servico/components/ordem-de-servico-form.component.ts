import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-ordem-de-servico-form',
  templateUrl: './ordem-de-servico-form.component.html',
  styleUrls: ['./ordem-de-servico-form.component.css']
})
export class OrdemDeServicoFormComponent implements OnInit {

  formOrdemDeServico;
  ordemDeServico;
  pacientes;
  convenios;
  postosDeColeta;
  medicos;
  exames;
  formSubmitted = false;
  habilitarLoadBotaoSalvar = false;
  minDate = new Date().toISOString().slice(0, 10);

  @ViewChild(ModalAlertComponent)
  private modalAlertComponent: ModalAlertComponent;

  @ViewChild('examesSelecionados')
  private examesSelecionados: ElementRef;

  @Output() save = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.get('pacientes').then(pacientes => {
      this.pacientes = pacientes;
    })
    .catch(error => this.modalAlertComponent.show(error.error));

    this.apiService.get('convenios').then(convenios => {
      this.convenios = convenios;
    })
    .catch(error => this.modalAlertComponent.show(error.error));

    this.apiService.get('posto_coletas').then(postosDeColeta => {
      this.postosDeColeta = postosDeColeta;
    })
    .catch(error => this.modalAlertComponent.show(error.error));

    this.apiService.get('medicos').then(medicos => {
      this.medicos = medicos;
    })
    .catch(error => this.modalAlertComponent.show(error.error));

    this.apiService.get('exames').then(exames => {
      this.exames = exames;
    })
    .catch(error => this.modalAlertComponent.show(error.error));
  }

  startForm(ordemDeServico = {}) {
    this.ordemDeServico = ordemDeServico;

    this.formOrdemDeServico = this.formBuilder.group({
      paciente: [ordemDeServico['pacienteId'], Validators.required],
      convenio: [ordemDeServico['convenioId'], Validators.required],
      postoDeColeta: [ordemDeServico['postoColetaId'], Validators.required],
      dataRetiradaExames: [ordemDeServico['dataRetiradaExames'], Validators.required],
      medico: [ordemDeServico['medicoId'], Validators.required],
      exames: [[], Validators.required]
    });

    if (this.isEdition) {
      setTimeout(() => this.formOrdemDeServico.get('exames').patchValue(ordemDeServico['exames'].map(exame => exame.exameId)), 0);
    }
  }

  valorTotalExames() {
    return this.examesSelecionados ? this.examesSelecionados['selectedItems'].reduce((sum, exame) => sum + exame.value.preco, 0) : 0;
  }

  verificarValidTouched(nomeCampo) {
    const campo = this.campoFormOrdemDeServico(nomeCampo);
    return campo.invalid && campo.touched;
  }

  campoFormOrdemDeServico(nomeCampo) {
    return this.formOrdemDeServico.get(nomeCampo);
  }

  form() {
    return {
      pacienteId: this.formOrdemDeServico.value.paciente,
      convenioId: this.formOrdemDeServico.value.convenio,
      postoColetaId: this.formOrdemDeServico.value.postoDeColeta,
      dataRetiradaExames: this.formOrdemDeServico.value.dataRetiradaExames,
      medicoId: this.formOrdemDeServico.value.medico,
      exames: this.formOrdemDeServico.value.exames.map(exameId => {
        const exame = {exameId};

        if (this.isEdition) {
          const ordemServicoExameId = this.ordemDeServico['exames'].find(exame => exame.exameId === exameId)?.ordemServicoExameId;

          if (ordemServicoExameId) { exame['ordemServicoExameId'] = ordemServicoExameId; }
        }

        return exame;
      })
    };
  }

  get isEdition() {
    return this.ordemDeServico.id;
  }

  salvar() {
    this.save.emit(this.form());
  }

  calcelar() {
    this.router.navigate(['ordem-de-servico']);
  }

}
