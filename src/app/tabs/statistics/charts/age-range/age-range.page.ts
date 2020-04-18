import {Component, OnInit} from '@angular/core';
import {SpainDataService} from '../../../../services/spain-data.service';
import {TransformDataService} from '../../../../services/transform-data.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min';

@Component({
  selector: 'app-age-range',
  templateUrl: './age-range.page.html',
  styleUrls: ['./age-range.page.scss'],
})
export class AgeRangePage implements OnInit {

  public result = {female: [], male: []};

  constructor(
    private spainDataService: SpainDataService,
    private transformDataService: TransformDataService) {
  }

  ngOnInit() {
    this.spainDataService.getCsvData$('AGE').subscribe(res => {
      this.transformDataService.transformDataByAge(res).then(
        (collection) => {
          this.result = collection as { female, male };
          this.renderLineChart();
        });
    });
  }

  private renderLineChart = (): void => {
    let chartAge = new CanvasJS.Chart('chartAgeContainer', {
      animationEnabled: true,
      title: {
        text: ''
      },
      axisY: {
        title: ''
      },
      legend: {
        cursor: 'pointer',

      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: 'bar',
          showInLegend: true,
          name: 'Hombre',
          color: '#1acce5',
          dataPoints: this.result.male
        },
        {
          type: 'bar',
          showInLegend: true,
          name: 'Mujer',
          color: '#a96efa',
          dataPoints: this.result.female
        }]
    });
    chartAge.render();
  };

}
