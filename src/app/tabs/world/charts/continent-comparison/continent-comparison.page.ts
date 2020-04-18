import { Component, OnInit } from '@angular/core';
import { NovelCovid } from 'novelcovid';
import * as CanvasJS from '../../../../../assets/canvasjs.min';

@Component({
  selector: 'app-continent-comparison',
  templateUrl: './continent-comparison.page.html',
  styleUrls: ['./continent-comparison.page.scss'],
})
export class ContinentComparisonPage implements OnInit {

  public europe;
  public northAmerica ;
  public southAmerica;
  public asia;
  public oceania;
  public africa;

  public summary;

  public continents = ["Europa", "América del Norte", "América del Sur", "Asia", "Oceanía", "África"];

  constructor() { }

  ngOnInit() {
    let novelCovid = new NovelCovid();
    novelCovid.continents().then(res => {
      this.europe = res.find(res => res.continent === 'Europe')
      this.northAmerica = res.find(res => res.continent === 'North America')
      this.southAmerica = res.find(res => res.continent === 'South America')
      this.asia = res.find(res => res.continent === 'Asia')
      this.oceania = res.find(res => res.continent === 'Oceania')
      this.africa = res.find(res => res.continent === 'Africa')
      this.summary = this.europe;
      this.renderChart();
    });

  }

  renderChart = () => {
    let chart = new CanvasJS.Chart('europeComparisonChartContainer', {
      animationEnabled: true,
      title:{
        text: ""
      },
      axisX: {
        interval: 1,
        intervalType: "year",
      },
      toolTip: {
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
      data: [{
        name: "Fallecidos",
        showInLegend: true,
        dataPoints: [
          { label: 'Europa', y: +this.europe.deaths },
          { label: 'Norteamérica', y: +this.northAmerica.deaths },
          { label: 'Sudamérica', y: +this.southAmerica.deaths },
          { label: 'Asia', y: +this.asia.deaths },
          { label: 'Oceanía', y: +this.oceania.deaths },
          { label: 'África', y: +this.africa.deaths },
        ]
      },
        {
          name: 'Enfermos',
          showInLegend: true,
          dataPoints: [
            {label: 'Europa', y: +this.europe.cases - +this.europe.recovered - +this.europe.deaths },
            {label: 'Norteamérica', y: +this.northAmerica.cases - +this.northAmerica.recovered - +this.northAmerica.deaths },
            {label: 'Sudamérica', y: +this.southAmerica.cases - +this.southAmerica.recovered - +this.southAmerica.deaths },
            {label: 'Asia', y: +this.asia.cases - +this.asia.recovered - +this.asia.deaths},
            {label: 'Oceanía', y: +this.oceania.cases - +this.oceania.recovered - +this.oceania.deaths},
            {label: 'África', y: +this.africa.cases - +this.africa.recovered - +this.africa.deaths},
          ]
        },
        {
          name: 'Curados',
          showInLegend: true,
          dataPoints: [
            {label: 'Europa', y: +this.europe.recovered},
            {label: 'Norteamérica', y: +this.northAmerica.recovered},
            {label: 'Sudamérica', y: +this.southAmerica.recovered},
            {label: 'Asia', y: +this.asia.recovered},
            {label: 'Oceanía', y: +this.oceania.recovered},
            {label: 'África', y: +this.africa.recovered},
          ]
        }
        ]
    });
    chart.render();
  };

  onSelectorChange = (event) => {
    switch (event.target.value) {
      case 'Europa':
        this.summary = this.europe;
        break;
      case 'América del Norte':
        this.summary = this.northAmerica;
        break;
      case 'América del Sur':
        this.summary = this.asia;
        break;
      case 'Asia':
        this.summary = this.southAmerica;
        break;
      case 'Oceania':
        this.summary = this.oceania;
        break;
      case 'África':
        this.summary = this.africa;
        break;
    }
  }
}
