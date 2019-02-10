import { Component, OnChanges, OnInit } from '@angular/core';
import { Weather, WeatherList } from '../../../model/weather';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromWeather from '../../store/reducers/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit, OnChanges {

  weathers$: Observable<Weather[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromWeather.State>) {
  }

  ngOnInit() {
     this.weathers$ = this.store.pipe(select(fromWeather.getWeathers));
     this.errorMessage$ = this.store.pipe(select(fromWeather.getError));
  }

  ngOnChanges() {
  }

  getTemperature(lists: WeatherList[], time: number): number {
    const timedList = lists.filter( list => (new Date(list.dt * 1000)).getHours() === time );
    if (timedList && timedList.length > 0) {
      return timedList[0].main.temp;
    }
    return 0;
  }
}


