import { Injectable } from '@angular/core';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class TransformDataService {

  constructor(private csvParser: Papa) { }

  transformDataByAge = (data) => {
    const dataByAge: {
      [key: string]: { confirmedCases: number, deaths: number, hospitalized: number, uci: number, others: number } } = {
      range0: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range1: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range2: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range3: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range4: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range5: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range6: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range7: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
      range8: {confirmedCases: 0, deaths: 0, hospitalized: 0, uci: 0, others: 0},
    };
    return new Promise(resolve => {
      this.csvParser.parse(data, {
        header: true,
        complete: results => {
          results.data.forEach(row => {
            if (row.sexo === 'ambos') {
              let rangeGroup = null;
              switch (row.rango_edad) {
                case '0-9':
                  rangeGroup = 'range0';
                  break;
                case '10-19':
                  rangeGroup = 'range1';
                  break;
                case '20-29':
                  rangeGroup = 'range2';
                  break;
                case '30-39':
                  rangeGroup = 'range3';
                  break;
                case '40-49':
                  rangeGroup = 'range4';
                  break;
                case '50-59':
                  rangeGroup = 'range5';
                  break;
                case '60-69':
                  rangeGroup = 'range6';
                  break;
                case '70-79':
                  rangeGroup = 'range7';
                  break;
                case '80 y +':
                case '80-89':
                case '90 y +':
                  rangeGroup = 'range8';
                  break;
              }

              const group = {...dataByAge[rangeGroup]};
              group.confirmedCases += +row.casos_confirmados;
              group.deaths += +row.fallecidos;
              group.hospitalized += +row.hospitalizados;
              group.uci += +row.ingresos_uci;
              dataByAge[rangeGroup] = group;
            }
          });
          resolve(dataByAge);
        }
      });
    });
  }
}
