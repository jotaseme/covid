import { Component, Input, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../../assets/canvasjs.min';
import { SpainDataService } from '../../../../services/spain-data.service';
import { TransformDataService } from '../../../../services/transform-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accumulate',
  templateUrl: './accumulate.page.html',
  styleUrls: ['./accumulate.page.scss'],
})
export class AccumulatePage implements OnInit {

  @Input() communitySelected$: Observable<string>;
  public dataCases = [];
  public dataDeaths = [];

  constructor(private spainDataService: SpainDataService, private transformDataService: TransformDataService) {
  }

  ngOnInit() {
    this.communitySelected$.subscribe(community => {
      this.spainDataService.getCsvData$('CASES').subscribe(res => {
        this.transformDataService.transformDataByCases(res, community).then(
          (collection) => {
            this.dataCases = collection as [];
          });
      });
      this.spainDataService.getCsvData$('DEATHS').subscribe(res => {
        this.transformDataService.transformDataByCases(res, community).then(
          (collection) => {
            this.dataDeaths = collection as [];
            this.renderChart();
          });
      });
    });
  }

  renderChart = () => {
    let chart = new CanvasJS.Chart('accumulateChartContainer', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: ''
      },
      axisX: {
        valueFormatString: 'DD MMM',
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        },
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
            labelAlign: 'far'
          }]
      },
      axisY: {
        title: '',
        crosshair: {
          enabled: true
        }
      }, toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        fontSize: 10,
        itemclick: function(e) {
          e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
          e.chart.render();
        }
      },
      data: [
        {
          name: 'Casos',
          type: 'line',
          showInLegend: true,
          dataPoints: this.dataCases
        },
        {
          name: 'Fallecidos',
          type: 'line',
          showInLegend: true,
          dataPoints: this.dataDeaths
        }]
    });
    chart.render();
  };
  seg_id: number;

  goToDetail(seg_id: any) {
    
  }
}
