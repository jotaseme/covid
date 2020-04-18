import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class TransformDataService {

  public ranges = ["90 y +", "80-89", "70-79", "60-69", "50-59", "40-49", "30-39", "20-29", "10-19", "0-9"];

  constructor(private csvParser: Papa) {
  }

  transformDataByCases = (data, ccaa = 'Total', daily = false) => {
    return new Promise(resolve => {
      this.csvParser.parse(data, {
        header: true,
        complete: results => {
          const dataSet = [];
          const data = results.data.find(res => res.CCAA === ccaa);
          const dates = Object.keys(data).slice(2, Object.keys(data).length);
          const values = Object.values(data).slice(2, Object.values(data).length);
          values.forEach((value, key) => {
            let val = daily && value !== '0' ? +value - (+values[key - 1]) : +values[key];
            dataSet.push({
              y: +val,
              x: new Date(2020, (+dates[key].split("-")[1]-1), +dates[key].split("-")[2]) })
          })
          resolve(dataSet);
        }
      });
    });
  };

  transformDataByAge = (data) => {
    return new Promise(resolve => {
      this.csvParser.parse(data, {
        header: true,
        complete: results => {
          let date = new Date();
          let femaleDataPoints = [];
          this.ranges.forEach( range => {
            let deaths = results.data.filter(res => {
              return res.sexo === 'mujeres'
                && res.rango_edad === range
                && res.fecha.split("-")[2] == date.getDate() - 1
            })[0].fallecidos
            femaleDataPoints.push({y: +deaths, label: range})
          });

          let maleDataPoints = [];
          this.ranges.forEach( range => {
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
