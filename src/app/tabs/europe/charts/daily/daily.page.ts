import { Component, Input, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../../assets/canvasjs.min';
import { Observable } from 'rxjs';
import { EuropeDataService } from '../../../../services/europe-data.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.page.html',
  styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

  @Input() countrySelected$: Observable<string>;
  public chart;
  public country;
  public dataCases = [];
  public dataDeaths = [];

  constructor(private europeDataService: EuropeDataService) {
  }

  ngOnInit() {
    this.countrySelected$.subscribe(country => {
      this.dataCases = [];
      this.dataDeaths = [];
      this.country = country;
      this.europeDataService.getHistoricalDataByCountry$(country).subscribe(res => {
        const dates = Object.keys((res as {timeline}).timeline.cases);
        const values = Object.values((res as {timeline}).timeline.cases);

        values.forEach((value, key) => {
          this.dataCases.push({
            y: +value - (+values[key - 1]),
            x: new Date(2020, (+dates[key].split("/")[0]-1), +dates[key].split("/")[1])
          })
          this.dataDeaths.push({
            y: +Object.values((res as {timeline}).timeline.deaths)[key] - (+Object.values((res as {timeline}).timeline.deaths)[key-1]),
            x: new Date(2020, (+Object.keys((res as {timeline}).timeline.deaths)[key].split("/")[0]-1), +Object.keys((res as {timeline}).timeline.deaths)[key].split("/")[1])
          })
        })
        this.renderChart();
      })
    })
  }

  renderChart = () => {
    this.chart = new CanvasJS.Chart('europeanDailyChartContainer', {
      animationEnabled: true,
      title: {
        text: ' '
      },
      axisX: {
        valueFormatString: 'DD MMM',
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
