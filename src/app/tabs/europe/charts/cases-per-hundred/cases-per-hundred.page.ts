import { Component, OnInit } from '@angular/core';
import { EuropeDataService } from '../../../../services/europe-data.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min';
import { EU_COUNTRIES } from '../../europe.page';


@Component({
  selector: 'app-cases-per-hundred',
  templateUrl: './cases-per-hundred.page.html',
  styleUrls: ['./cases-per-hundred.page.scss'],
})
export class CasesPerHundredPage implements OnInit {

  public dataCasesPerHundred = [];
  public dataDeathPerHundred = [];
  public dataTestsPerHundred = [];

  constructor(private europeDataService: EuropeDataService) {
  }

  ngOnInit() {
    this.europeDataService.getAllReports$().subscribe(res => {
      (res as {reports}).reports[0].table[0].filter(country => {
        return EU_COUNTRIES.includes(country.Country);
      }).forEach(euCountry => {
        this.dataCasesPerHundred.push({
          y: +euCountry['TotCases_1M_Pop'].replace(',',''),
          label: euCountry['Country']
        });
        this.dataDeathPerHundred.push({
          y: +euCountry['Deaths_1M_pop'].replace(',',''),
          label: euCountry['Country']
        });
        this.dataTestsPerHundred.push({
          y: +(euCountry['Tests_1M_Pop'].replace(',','')),
          label: euCountry['Country']
        })
      })
      this.renderChartCases();
      this.renderChartDeaths();
      this.renderChartTests();
    })
  }

  renderChartCases = () => {
    let chartCases = new CanvasJS.Chart('chartContainerCases', {
      animationEnabled: true,
      title: {
        text: ''
      },
      axisX: {
        interval: 1
      },
      axisY2: {
        interlacedColor: 'rgba(88,100,101,0.2)',
        gridColor: 'rgba(69,76,78,0.1)',
        title: ''
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
          type: 'bar',
          name: 'Casos',
          showInLegend: true,
          axisYType: 'secondary',
          color: '#e3b74b',
          dataPoints: this.dataCasesPerHundred
        },
      ]
    });
    chartCases.options.data[0].dataPoints.sort(this.compareDataPointYAscend);
    chartCases.render();
  };

  renderChartDeaths = () => {
    let chartDeaths = new CanvasJS.Chart('chartContainerDeaths', {
      animationEnabled: true,
      title: {
        text: ''
      },
      axisX: {
        interval: 1
      },
      axisY2: {
        interlacedColor: 'rgba(88,100,101,0.2)',
        gridColor: 'rgba(69,76,78,0.1)',
        title: ''
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
          type: 'bar',
          showInLegend: true,
          name: 'Fallecidos',
          axisYType: 'secondary',
          color: '#e80e36',
          dataPoints: this.dataDeathPerHundred
        }
      ]
    });
    chartDeaths.options.data[0].dataPoints.sort(this.compareDataPointYAscend);
    chartDeaths.render();
  };

  renderChartTests = () => {
    let chartTests = new CanvasJS.Chart('chartContainerTests', {
      animationEnabled: true,
      title: {
        text: ''
      },
      axisX: {
        interval: 1
      },
      axisY2: {
        interlacedColor: 'rgba(88,100,101,0.2)',
        gridColor: 'rgba(69,76,78,0.1)',
        title: ''
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
          type: 'bar',
          showInLegend: true,
          name: 'Tests',
          axisYType: 'secondary',
          color: '#107220',
          dataPoints: this.dataTestsPerHundred
        }
      ]
    });
    chartTests.options.data[0].dataPoints.sort(this.compareDataPointYAscend);
    chartTests.render();
  };

  compareDataPointYAscend(dataPoint1, dataPoint2) {
    return dataPoint1.y - dataPoint2.y;
  }
}
