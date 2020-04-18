import {Component, OnInit} from '@angular/core';
import {NovelCovid} from 'novelcovid';
import * as CanvasJS from 'src/assets/canvasjs.min.js';


@Component({
  selector: 'app-historical',
  templateUrl: './historical.page.html',
  styleUrls: ['./historical.page.scss'],
})
export class HistoricalPage implements OnInit {

  public cases = [];
  public deaths = [];
  public recovered = [];

  constructor() {
  }

  ngOnInit() {
    const track = new NovelCovid();
    track.historical(null, 'Spain').then(res => {
      (Object.keys((res as { timeline }).timeline.cases)).forEach((value, key) => {
        this.cases.push({x: new Date(2020, (+value.split("/")[0]-1), +value.split("/")[1]), y: +(Object.values((res as { timeline }).timeline.cases))[key]});
      });
      (Object.keys((res as { timeline }).timeline.deaths)).forEach((value, key) => {
        this.deaths.push({x: new Date(2020, (+value.split("/")[0]-1), +value.split("/")[1]), y: (Object.values((res as { timeline }).timeline.deaths))[key]});
      });
      (Object.keys((res as { timeline }).timeline.recovered)).forEach((value, key) => {
        this.recovered.push({x: new Date(2020, (+value.split("/")[0]-1), +value.split("/")[1]), y: (Object.values((res as { timeline }).timeline.recovered))[key]});
      });
      this.renderLineChart();
    });
  }

  private renderLineChart = ():void => {
    let chart = new CanvasJS.Chart('statisticsChartContainer', {
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
        }
      },
      axisY: {
        title: '',
        crosshair: {
          enabled: true
        }
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'bottom',
        horizontalAlign: 'left',
      },
      data: [
        {
          type: 'line',
          showInLegend: true,
          name: 'Casos',
          markerType: 'square',
          dataPoints: this.cases
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Fallecidos',
          color: '#de1527',
          dataPoints: this.deaths
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Recuperados',
          color: '#4bde15',
          dataPoints: this.recovered
        }]
    });
    chart.render();
  }
}
