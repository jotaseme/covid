import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-europe',
  templateUrl: './europe.page.html',
  styleUrls: ['./europe.page.scss'],
})
export class EuropePage implements OnInit {

  public countrySelected$ = new BehaviorSubject<string>('Spain');

  constructor() { }

  ngOnInit() {
  }

  onCountrySelected = (event) => {
    this.countrySelected$.next(event);
  }
}

export const EU_COUNTRIES = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'United Kingdom',
];
