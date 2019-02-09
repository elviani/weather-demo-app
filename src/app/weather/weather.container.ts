import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from '../model/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search></app-search>
  <app-results></app-results>  `
})
export class WeatherContainer {

  constructor() {}
  
}
