import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WorldPage } from './world.page';
import { WorldPageRoutingModule } from './world-routing.module';
import { ContinentComparisonPage } from './charts/continent-comparison/continent-comparison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorldPageRoutingModule
  ],
  declarations: [WorldPage, ContinentComparisonPage]
})
export class WorldModule {}
