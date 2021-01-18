import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { OrdemDeServicoRoutingModule } from './ordem-de-servico-routing.module';

import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';
import { OrdemDeServicoComponent } from './pages/ordem-de-servico.component';
import { OrdemDeServicoShowComponent } from './pages/ordem-de-servico-show.component';
import { OrdemDeServicoNewComponent } from './pages/ordem-de-servico-new.component';
import { OrdemDeServicoEditComponent } from './pages/ordem-de-servico-edit.component';
import { OrdemDeServicoFormComponent } from './components/ordem-de-servico-form.component';

@NgModule({
  declarations: [
    ModalAlertComponent,
    OrdemDeServicoComponent,
    OrdemDeServicoShowComponent,
    OrdemDeServicoNewComponent,
    OrdemDeServicoEditComponent,
    OrdemDeServicoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdemDeServicoRoutingModule,
    NgSelectModule
  ]
})
export class OrdemDeServicoModule { }
