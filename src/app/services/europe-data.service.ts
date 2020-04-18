import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EuropeDataService {

  private endpointEuropeanUnion = 'https://covid19-server.chrismichael.now.sh/api/v1/AllCasesInEurope';

  constructor(private httpClient: HttpClient) { }

  getEuropeanUnionData$ =() => {
    return this.httpClient.get(this.endpointEuropeanUnion);
  }
}
