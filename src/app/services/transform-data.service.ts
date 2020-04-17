import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class TransformDataService {

  constructor(private csvParser: Papa) {
  }

  transformDataByCases = (data) => {
    return new Promise(resolve => {
      this.csvParser.parse(data, {
        header: true,
        complete: results => {
          let row = results.data.filter((res) => res.cod_ine == '00')[0];
          const dates = Object.keys(row);
          const cases = Object.values(row);
          dates.splice(0, 2);
          cases.splice(0, 2);
          const increment = [];
          cases.forEach((value, index) => {
            let val = +value - (+cases[index-1]);
            increment.push(isNaN(val) ? 0 : val );
          })
          let kk = [];
          dates.forEach((value, index) => {
            kk.push({name: value, value: increment[index]})
          })
          resolve(kk);
        }
      });
    });
  };

  transformDataByAge = (data) => {
    const ranges = ["90 y +", "80-89", "70-79", "60-69", "50-59", "40-49", "30-39", "20-29", "10-19", "0-9"];
    return new Promise(resolve => {
      this.csvParser.parse(data, {
        header: true,
        complete: results => {
          let date = new Date();
          let femaleDataPoints = [];
          ranges.forEach( range => {
            let deaths = results.data.filter(res => {
              return res.sexo === 'mujeres'
                && res.rango_edad === range
                && res.fecha.split("-")[2] == date.getDate() - 1
            })[0].fallecidos
            femaleDataPoints.push({y: +deaths, label: range})
          });

          let maleDataPoints = [];
          ranges.forEach( range => {
            let deaths = results.data.filter(res => {
              return res.sexo === 'hombres'
                && res.rango_edad === range
                && res.fecha.split("-")[2] == date.getDate() - 1
            })[0].fallecidos
            maleDataPoints.push({y: +deaths, label: range})
          });
          resolve({female: femaleDataPoints, male: maleDataPoints});
        }
      });
    });
  };
}
