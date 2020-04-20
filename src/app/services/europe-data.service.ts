import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EuropeDataService {

  private endpointEuropeanUnion = 'https://covid19-server.chrismichael.now.sh/api/v1/AllCasesInEurope';
  private endpointAllReports = 'https://covid19-server.chrismichael.now.sh/api/v1/AllReports';
  private endpointCountryUnion = 'https://corona.lmao.ninja/v2/historical/';

  constructor(private httpClient: HttpClient) { }

  getEuropeanUnionData$ =() => {
    return this.httpClient.get(this.endpointEuropeanUnion);
  }

  getHistoricalDataByCountry$ = (country: string) => {
    return this.httpClient.get(this.endpointCountryUnion+country+'?lastdays=50')
  }

  getAllReports$ = () => {
    return this.httpClient.get(this.endpointAllReports)
  }
}
