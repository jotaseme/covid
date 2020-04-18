import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { StatisticsPage } from './statistics.page';
import { HistoricalPage } from './charts/historical/historical.page';
import { AgeRangePage } from './charts/age-range/age-range.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxChartsModule,
    StatisticsPageRoutingModule
  ],
  declarations: [StatisticsPage, HistoricalPage, AgeRangePage]
})
export class StatisticsPageModule {}
