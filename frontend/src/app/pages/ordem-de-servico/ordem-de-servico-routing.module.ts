import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdemDeServicoComponent } from './pages/ordem-de-servico.component';
import { OrdemDeServicoShowComponent } from './pages/ordem-de-servico-show.component';
import { OrdemDeServicoNewComponent } from './pages/ordem-de-servico-new.component';
import { OrdemDeServicoEditComponent } from './pages/ordem-de-servico-edit.component';

const routes: Routes = [
  { path: '', component: OrdemDeServicoComponent },
  { path: 'adicionar', component: OrdemDeServicoNewComponent },
  { path: ':id', component: OrdemDeServicoShowComponent },
  { path: ':id/alterar', component: OrdemDeServicoEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdemDeServicoRoutingModule { }
