import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EuropePageRoutingModule } from './europe-routing.module';
import { EuropePage } from './europe.page';
import { CasesPerHundredPage } from './charts/cases-per-hundred/cases-per-hundred.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EuropePageRoutingModule
  ],
  declarations: [EuropePage, CasesPerHundredPage]
})
export class EuropePageModule {}
