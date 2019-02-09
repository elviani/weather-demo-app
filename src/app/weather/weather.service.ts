import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Weather } from '../model/weather';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951'
  };

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city): Observable<Weather> {
    console.log("COMING TO SEARCH WEATHER FOR CITY");
    console.log(city);
    // implement the service
    return this.http.get<Weather>(this.url + 
      '?q=' + city +
      '&appid=' + this.params.APPID +
      '&units=' + this.params.units);
  }

}
