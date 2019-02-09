import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { WeatherService } from '../../weather.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as weatherActions from '../actions/weather';

@Injectable()
export class WeatherEffects {

  constructor(private weatherService: WeatherService,
              private actions$: Actions) { }

  @Effect()
  addNewCity$: Observable<Action> = this.actions$.pipe(
    ofType(weatherActions.WeatherActionType.AddNewCity),
    map(action => (action as any).payload),
    mergeMap(city =>
      this.weatherService.searchWeatherForCity(city).pipe(
        map(weather => (new weatherActions.AddNewCitySuccess(weather))),
        catchError(err => of(new weatherActions.AddNewCityFail(err.error.message)))
      )
    )
  );
}
