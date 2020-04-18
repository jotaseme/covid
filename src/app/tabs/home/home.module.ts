import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ChartsModule } from 'ng2-charts';
import { SummaryPage} from './panels/summary/summary.page';
import { ChartsPage } from './charts/charts.page';
import { AccumulatePage } from './charts/accumulate/accumulate.page';
import { DailyPage } from './charts/daily/daily.page';
import { AgeRangePage   } from './charts/age-range/age-range.page';

@NgModule({
    imports: [
        ChartsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
  declarations: [HomePage, SummaryPage ,ChartsPage, AccumulatePage, DailyPage, AgeRangePage]
})
export class HomePageModule {}
