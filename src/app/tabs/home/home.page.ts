/* tslint:disable:no-string-literal */
import {Component, OnInit} from '@angular/core';
import {SpainDataService} from '../../services/spain-data.service';
import {Label, MultiDataSet} from 'ng2-charts/lib/base-chart.directive';
import {Color} from 'ng2-charts/lib/color';
import {TransformDataService} from '../../services/transform-data.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public communities;
    public lineChartData: any[];
    public lineChartLabels: Label[];
    public lineChartOptions;
    public lineChartColors: Color[];
    public lineChartLegend = true;
    public lineChartPlugins = [];
    public lineChartType = 'line';

    public data = false;
    public chartReady = false;

    doughnutChartLabels: Label[];
    doughnutChartData: MultiDataSet;
    doughnutChartType: ChartType = 'doughnut';

    barChartOptions: ChartOptions = {
        responsive: true,
    };
    barChartLabels: Label[];
    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartPlugins = [];

    barChartData: ChartDataSets[];


    rows = [];
    loadingIndicator = true;
    reorderable = true;

    public columns = [
        { prop: 'ccaa', name: 'CCAA' },
        { prop: 'casos_totales', name: 'Casos' },
        { prop: 'hospitalizados', name: 'Hospitalizados', sortable: false },
        { prop: 'fallecidos', name: 'Fallecidos'}
        ];



    single: any[] = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        },
        {
            "name": "France",
            "value": 7200000
        }
    ];
    multi: any[];
    result: any[];

    // options
    showXAxis = true;
    showYAxis = true;
    showLegend = false;
    xAxisLabel = 'Fecha';

    colorScheme = {
        domain: ['#A10A28']
    };

    chartSelected = 'all';
    schemeType: string = 'ordinal';
    constructor(private spainDataService: SpainDataService,
                private transformDataService: TransformDataService) {

    }

    ngOnInit(): void {
        console.log('hola')
        this.spainDataService.getCsvData$('CASES').subscribe(res => {
            this.transformDataService.transformDataByCases(res).then(
                (collection) => {
                    this.single = collection as [];
                }
            );
        });

        this.spainDataService.getAll$().subscribe(res => {
            this.loadingIndicator = false;
            this.communities = res;
        });
        this.lineChartOptions = {
            responsive: true,
        };

        this.lineChartColors = [
            {
                borderColor: 'black',
                backgroundColor: 'rgba(255,255,0,0.28)',
            },
        ];
    }

    onSelectorClicked(event) {
        this.chartSelected = event.target.value;
    }
}
