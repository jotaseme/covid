import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class SpainDataService {

  private endpointDeathsCSV = 'https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/ccaa_covid19_fallecidos.csv';
  private endpointAgeCSV = 'https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/nacional_covid19_rango_edad.csv';
  private endpointCasesCSV = 'https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/ccaa_covid19_casos.csv';
  private endpointSpainCasesByCommunities = 'https://covid19-server.chrismichael.now.sh/api/v1/SpainCasesByCommunities';

  constructor(private httpClient: HttpClient, private csvParser: Papa) { }

  getCsvData$ = (endpoint: string): Observable<any> => {
    let url = '';
    switch (endpoint) {
      case 'AGE':
        url = this.endpointAgeCSV;
        break;
      case 'DEATHS':
        url = this.endpointDeathsCSV;
        break;
      case 'CASES':
        url = this.endpointCasesCSV;
        break;
    }
    return this.httpClient.get(url, {headers: new HttpHeaders({}), responseType: 'text'});
  }

  getSpainCasesByCommunities$ =() => {
    return this.httpClient.get(this.endpointSpainCasesByCommunities);
  }

  getBannerImage$ = () => {
    this.httpClient.get('https://covid19tracking.narrativa.com/feed.json').subscribe(res => console.log(res))
  }
}
