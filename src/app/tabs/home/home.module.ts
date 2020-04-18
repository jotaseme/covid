import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomePage } from './home.page';
import {ChartsModule} from 'ng2-charts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HistoricalPage} from './charts/historical/historical.page';
import {AgeRangePage} from './charts/age-range/age-range.page';
import {SummaryPage} from './panels/summary/summary.page';

@NgModule({
    imports: [
        ChartsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        NgxChartsModule,
        NgxDatatableModule.forRoot({
            messages: {
                emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
                totalMessage: 'total', // Footer total message
                selectedMessage: 'selected' // Footer selected message
            }
        }),
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
  declarations: [HomePage, HistoricalPage, AgeRangePage, SummaryPage]
})
export class HomePageModule {}
