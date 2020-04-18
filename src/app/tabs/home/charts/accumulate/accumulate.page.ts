import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as CanvasJS from '../../../../../assets/canvasjs.min';
import {SpainDataService} from '../../../../services/spain-data.service';
import {TransformDataService} from '../../../../services/transform-data.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-accumulate',
  templateUrl: './accumulate.page.html',
  styleUrls: ['./accumulate.page.scss'],
})
export class AccumulatePage implements OnInit {

  @Input() communitySelected$: Observable<string>;
  public dataCases = [];

  constructor(private spainDataService: SpainDataService, private transformDataService: TransformDataService) {
  }

  ngOnInit() {
    this.communitySelected$.subscribe(community => {
      this.spainDataService.getCsvData$('CASES').subscribe(res => {
        this.transformDataService.transformDataByCases(res, community).then(
          (collection) => {
            this.dataCases = collection as [];
            this.renderChart();
          });
      })
    });
  }

  renderChart = () => {
    let chart = new CanvasJS.Chart("accumulateChartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: ""
      },
      axisX: {
        valueFormatString: 'DD MMM',
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: '',
        crosshair: {
          enabled: true
        }
      },toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        fontSize: 10,
      },
      data: [{
        name: "Casos",
        type: "line",
        showInLegend: true,
        dataPoints: this.dataCases
      }]
    });
    chart.render();
  }
}
