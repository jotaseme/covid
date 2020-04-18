import { Component, OnInit } from '@angular/core';
import { SpainDataService } from '../../services/spain-data.service';
import { TransformDataService } from '../../services/transform-data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  public chartSelected = 'all';
  public single = [];
  public showXAxis = true;
  public showYAxis = true;
  public showLegend = false;
  public  colorScheme = {
    domain: ['#A10A28']
  };

  constructor(private spainDataService: SpainDataService, private transformDataService: TransformDataService) { }

  ngOnInit() {

    this.spainDataService.getCsvData$('CASES').subscribe(res => {
      this.transformDataService.transformDataByCases(res).then(
        (collection) => {
          this.single = collection as [];
        }
      );
    });
  }

  onSelectorClicked(event) {
    this.chartSelected = event.target.value;
  }

}
