import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class SpainDataService {

  public endpoint = 'https://api.chollx.es/coronavirus/ca';
  public endpointDeathsCSV = 'https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/ccaa_covid19_fallecidos_long.csv';
  public endpointAgeCSV = 'https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/nacional_covid19_rango_edad.csv';

  constructor(private httpClient: HttpClient, private csvParser: Papa) { }

  getAll$ = (): Observable <any> => {
    return this.httpClient.get(this.endpoint, {});
  }

  getCsvData$ = (endpoint: string): Observable<any> => {
    let url = '';
    switch (endpoint) {
      case 'AGE':
        url = this.endpointAgeCSV;
        break;
      case 'DEATHS':
        url = this.endpointDeathsCSV;
        break;
    }
    return this.httpClient.get(url, {headers: new HttpHeaders({}), responseType: 'text'});
  }
}
