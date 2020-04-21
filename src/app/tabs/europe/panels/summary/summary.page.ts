import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import NovelCovid from 'novelcovid';
import { EU_COUNTRIES } from '../../europe.page';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  @Output() countrySelected = new EventEmitter<string>();
  public summary;
  public selectedCountry = 'Spain';

  public novelCovid;

  public countries = EU_COUNTRIES;
  date = new Date();

  constructor() {
    this.novelCovid = new NovelCovid();
  }

  ngOnInit() {
    this.novelCovid.countries(this.selectedCountry).then(res => {
      this.summary = res;
    });

  }

  onSelectorChange(event: any) {
    this.countrySelected.next(event.target.value)
    this.novelCovid.countries(event.target.value).then(res => {
      this.summary = res;
    })
  }
}
