import {Component, OnInit} from '@angular/core';
import {SpainDataService} from '../services/spain-data.service';
import {Label, MultiDataSet} from 'ng2-charts/lib/base-chart.directive';
import {Color} from 'ng2-charts/lib/color';
import {NovelCovid} from 'novelcovid';
import {TransformDataService} from '../services/transform-data.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public spainInfo;
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

    columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company', sortable: false }];


    constructor(private spainDataService: SpainDataService,
                private transformDataService: TransformDataService) {
        this.fetch(data => {
            this.rows = data;
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);
        });
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/company.json`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    ngOnInit(): void {

        this.spainDataService.getCsvData$('AGE').subscribe(res => {
            this.transformDataService.transformDataByAge(res).then(
                (collection) => {
                    this.chartReady = true;
                    this.doughnutChartLabels = ['Fallecidos', 'Uci', 'Hospitalizados', 'Seguimiento remoto'];
                    this.doughnutChartData = [
                        collection['range0'].deaths,
                        collection['range0'].uci,
                        collection['range0'].hospitalized,
                        collection['range0'].others,
                    ];
                    this.barChartLabels = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69'];
                    this.barChartData = [
                        {
                            data: [
                                collection['range0'].deaths,
                                collection['range1'].deaths,
                                collection['range2'].deaths,
                                collection['range3'].deaths,
                                collection['range4'].deaths,
                                collection['range5'].deaths,
                                collection['range6'].deaths
                            ], label: 'Fallecidos'
                        }
                    ];
                }
            );
        });
        this.spainDataService.getAll$().subscribe(res => this.communities = res);
        this.lineChartOptions = {
            responsive: true,
        };

        this.lineChartColors = [
            {
                borderColor: 'black',
                backgroundColor: 'rgba(255,255,0,0.28)',
            },
        ];

        const track = new NovelCovid();
        track.countries('ESP').then(res => {
            this.spainInfo = res;
        })
        track.historical(null, 'Spain').then(res => {
            this.data = true;
            console.log();
            this.lineChartLabels = Object.keys((res as { timeline }).timeline.cases);
            this.lineChartData = [
                {
                    data: Object.values((res as { timeline }).timeline.cases),
                    label: 'Casos'
                },
                {
                    data: Object.values((res as { timeline }).timeline.deaths),
                    label: 'Fallecidos'
                },
                {
                    data: Object.values((res as { timeline }).timeline.recovered),
                    label: 'Recuperados'
                },
            ];
        });
    }

    fun() {
        console.log('kkk');
    }
}
