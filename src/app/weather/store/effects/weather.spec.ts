import { TestBed } from '@angular/core/testing';
import { EffectsTestingModule } from '../../../testing/testing.module';
import { WeatherEffects } from './weather';
import { WeatherService } from '../../weather.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EffectsRunner } from '../../../testing/runner';
import * as weatherActions from '../actions/weather';
import mockResponse from '../../../testing/mockresponse';

describe('WeatherEffects', () => {

    let runner, weatherEffects, weatherService;

    beforeEach(() => TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule
      ],
      providers: [
        WeatherEffects,
        {
          provide: WeatherService,
          useValue: jasmine.createSpyObj('weatherService', ['searchWeatherForCity'])
        }
      ]
    }));

    beforeEach(() => {
        runner = TestBed.get(EffectsRunner);
        weatherEffects = TestBed.get(WeatherEffects);
        weatherService = TestBed.get(WeatherService);
      });

    it('should return a AddNewCitySuccess action, on success', () => {
        const postsToReturn = mockResponse;
        weatherService.searchWeatherForCity.and.returnValue(Observable.of(postsToReturn));
        const expectedResult = new weatherActions.AddNewCitySuccess(postsToReturn);
        runner.queue(new weatherActions.AddNewCity('London'));
        weatherEffects.addNewCity$.subscribe(result => {
          expect(result).toEqual(expectedResult);
        });

    });
});
