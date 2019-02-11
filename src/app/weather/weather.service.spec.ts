import { TestBed, inject } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClient } from '../../../node_modules/@angular/common/http';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          WeatherService,
          {provide: HttpClient , userValue: {}}
        ]
    });
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});
