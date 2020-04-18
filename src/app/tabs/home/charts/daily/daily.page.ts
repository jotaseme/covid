import {Component, Input, OnInit} from '@angular/core';
import {SpainDataService} from '../../../../services/spain-data.service';
import {TransformDataService} from '../../../../services/transform-data.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

  @Input() communitySelected$: Observable<string>;
  public data = [];

  constructor(private spainDataService: SpainDataService, private transformDataService: TransformDataService) {
  }

  ngOnInit() {
    this.communitySelected$.subscribe(community => {
      this.spainDataService.getCsvData$('CASES').subscribe(res => {
        this.transformDataService.transformDataByCases(res, community, true).then(
          (collection) => {
            this.data = collection as [];
            this.renderChart();
          });
      })
    });

  }

  renderChart = () => {
    let chart = new CanvasJS.Chart("dailyChartContainer", {
      animationEnabled: true,
      title:{
        text: " "
      },
      axisX: {
        valueFormatString: "DD MMM"
      },
      axisY: {
        title: "",
        includeZero: false,
        suffix: ""
      },
      legend:{
        cursor: "pointer",
        fontSize: 10,
      },
      toolTip:{
        shared: true
      },
      data: [{
        name: "Casos",
        type: "spline",
        showInLegend: true,
        dataPoints: this.data
      }]
    });
    chart.render();
  }
}
