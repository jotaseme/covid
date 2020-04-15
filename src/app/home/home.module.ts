import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {ChartsModule} from 'ng2-charts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        ChartsModule,
        CommonModule,
        FormsModule,
        IonicModule,
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
  declarations: [HomePage]
})
export class HomePageModule {}
