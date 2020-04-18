import { Component, Input, OnInit } from '@angular/core';
import { SpainDataService } from '../../../../services/spain-data.service';
import { TransformDataService } from '../../../../services/transform-data.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

  @Input() communitySelected$: Observable<string>;
  public chart;

  public dataCases = [];
  public dataDeaths = [];

  constructor(private spainDataService: SpainDataService, private transformDataService: TransformDataService) {
  }

  ngOnInit() {
    this.communitySelected$.subscribe(community => {
      this.spainDataService.getCsvData$('CASES').subscribe(res => {
        this.transformDataService.transformDataByCases(res, community, true).then(
          (collection) => {
            this.dataCases = collection as [];
          });
      });

      this.spainDataService.getCsvData$('DEATHS').subscribe(res => {
        this.transformDataService.transformDataByCases(res, community, true).then(
          (collection) => {
            this.dataDeaths = collection as [];
            this.renderChart();
          });
      });

    });
  }

  renderChart = () => {
    this.chart = new CanvasJS.Chart('dailyChartContainer', {
      animationEnabled: true,
      title: {
        text: ' '
      },
      axisX: {
        valueFormatString: 'DD MMM',
        stripLines: [
          {
            value: new Date(2020, 2, 14),
            label: 'Estado alarma',
            labelFontColor: '#808080',
            opacity: '.3',
            labelAlign: 'far'
          },
          {
            value: new Date(2020, 2, 30),
            label: 'Estado alarma',
            labelFontColor: '#808080',
            opacity: '.3',
            labelAlign: 'center'
          }
        ]
      },
      axisY: {
        title: '',
        includeZero: false,
        suffix: ''
      },
      legend: {
        cursor: 'pointer',
        fontSize: 10,
        itemclick: function(e) {
          e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
          e.chart.render();
        }
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          name: 'Casos',
          type: 'spline',
          showInLegend: true,
          dataPoints: this.dataCases
        },
        {
          name: 'Fallecidos',
          type: 'spline',
          showInLegend: true,
          dataPoints: this.dataDeaths
        },

      ]
    });
    this.chart.render();
  };
}
