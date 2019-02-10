import { WeatherActionType, WeatherAction} from '../actions/weather';
import { Weather } from '../../../model/weather';
import { createFeatureSelector, createSelector } from '@ngrx/store';

  export interface State {
    weathers: WeatherState;
  }

  export interface WeatherState {
    weathers: Weather[];
    inProgress: boolean;
    error: string;
  }

  const initialState: WeatherState = {
    weathers: [],
    inProgress: false,
    error: ''
  };

  const getWeatherFeatureState = createFeatureSelector<WeatherState>('weather');

  export const getWeathers = createSelector(
    getWeatherFeatureState,
    state => state.weathers
  );

  export const getError = createSelector(
    getWeatherFeatureState,
    state => state.error
  );

  export const getInProgress = createSelector(
    getWeatherFeatureState,
    state => state.inProgress
  );

  export function reducer(state = initialState, action: WeatherAction): WeatherState {
    switch (action.type) {
      case WeatherActionType.AddNewCity:
        return {
            ...state,
            inProgress: true
        };
      case WeatherActionType.AddNewCitySuccess:
        return {
            ...state,
            inProgress: false,
            weathers: [...state.weathers, action.payload]
        };
      case WeatherActionType.AddNewCityFail:
        return {
            ...state,
            inProgress: false,
            error: action.payload
        };
      default:
        return state;
    }
  }
