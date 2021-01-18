import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('chartBar', {static: true}) chartBar: ElementRef;
  @ViewChild('chartPie', {static: true}) chartPie: ElementRef;
  dataChartBar;
  dataChartPie;
  dashboard;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.get('dashboard').then(dashboard => {
      this.dashboard = dashboard;

      if (dashboard['atendimentosPorMes'].length) {
        this.buildBarChart(dashboard);
        this.buildPieChart(dashboard);
      }
    });
  }

  buildBarChart(dashboard) {
    this.dataChartBar = new Chart(
      this.chartBar.nativeElement,
      {
        type: 'bar',
        data: {
            labels: dashboard.atendimentosPorMes.map(atendimentoPorMes => atendimentoPorMes.mesAno),
            datasets: [{
                data: dashboard.atendimentosPorMes.map(atendimentoPorMes => atendimentoPorMes.quantidade),
                backgroundColor: dashboard.atendimentosPorMes.map(_ => this.dynamicColors()),
                borderColor: dashboard.atendimentosPorMes.map(_ => 'rgb(192,192,192,1)'),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Quantidade'
                    }
                }],
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Mês / Ano'
                  }
              }]
            },
            legend: {
              display: false
            }
        }
      }
    );
  }

  buildPieChart(dashboard) {
    const porcentagemPendentes = Math.round(
      dashboard['examesPendentesERealizados']['examesPendentes'] / dashboard['examesPendentesERealizados']['totalDeExames'] * 100 * 100
    ) / 100;

    const porcentagemRealizados = Math.round(
      dashboard['examesPendentesERealizados']['examesRealizados'] / dashboard['examesPendentesERealizados']['totalDeExames'] * 100 * 100
    ) / 100;

    this.dataChartPie = new Chart(
      this.chartPie.nativeElement,
      {
        type: 'pie',
        data: {
            labels: [
              `Pendentes ${porcentagemPendentes} %`,
              `Realizados ${porcentagemRealizados} %`
            ],
            datasets: [{
                data: [
                  dashboard['examesPendentesERealizados']['examesPendentes'],
                  dashboard['examesPendentesERealizados']['examesRealizados']
                ],
                backgroundColor: [
                  this.dynamicColors(),
                  this.dynamicColors()
                ],
                borderColor: [
                  'rgb(192,192,192,1)',
                  'rgb(192,192,192,1)'
                ],
                borderWidth: 1
            }]
        }
      }
    );
  }

  get quantidadeDeAtendimentos() {
    return this.dashboard?.atendimentosPorMes?.reduce((sum, mesAno) => sum + mesAno.quantidade, 0);
  }

  get possuiAtendimentos() {
    return this.dashboard?.atendimentosPorMes.length;
  }

  dynamicColors() {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`;
  }

}
