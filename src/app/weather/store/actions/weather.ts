import { Action } from '@ngrx/store';
import { Weather } from '../../../model/weather';

export enum WeatherActionType {
    AddNewCity = '[Weather] Add New City',
    AddNewCitySuccess = '[Weather] Add New City Success',
    AddNewCityFail = '[Weather] Add New City Fail',
}

export class AddNewCity implements Action {
    readonly type = WeatherActionType.AddNewCity;
    constructor(public payload: string) { }
}

export class AddNewCitySuccess implements Action {
    readonly type = WeatherActionType.AddNewCitySuccess;
    constructor(public payload: Weather) { }
}
  
export class AddNewCityFail implements Action {
    readonly type = WeatherActionType.AddNewCityFail;
    constructor(public payload: string) { }
}
  
export type WeatherAction = AddNewCity | AddNewCitySuccess | AddNewCityFail;