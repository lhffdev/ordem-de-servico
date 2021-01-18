import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-ordem-de-servico',
  templateUrl: './ordem-de-servico.component.html',
  styleUrls: ['./ordem-de-servico.component.css']
})
export class OrdemDeServicoComponent implements OnInit {

  ordensDeServico;
  searchTerm;
  pesquisando = false;

  @ViewChild(ModalAlertComponent)
  private modalAlertComponent: ModalAlertComponent;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.search()
  }

  search(searchTerm = null) {
    this.pesquisando = true;

    this.apiService.get('ordem_servicos', searchTerm ? {searchTerm: searchTerm} : {}).then(ordensDeServico => {
      this.ordensDeServico = ordensDeServico;
      this.pesquisando = false;
    })
    .catch(error => {
      this.pesquisando = false;
      this.modalAlertComponent.show(error.error);
    })
  }

  customSearch() {
    this.search(this.searchTerm);
    return false;
  }

  showOrdemDeServico(id) {
    return `/ordem-de-servico/${id}`;
  }
}
