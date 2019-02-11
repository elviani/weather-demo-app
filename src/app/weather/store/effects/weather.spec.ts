import { TestBed } from '@angular/core/testing';
import { EffectsTestingModule } from '../../../testing/testing.module';
import { WeatherEffects } from './weather';
import { WeatherService } from '../../weather.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EffectsRunner } from '../../../testing/runner';
import * as weatherActions from '../actions/weather';

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
        const postsToReturn = {"cod":"200", "message":0.0035,'cnt':38,
        'list':[
          {'dt':1549778400,'main':{'temp':6.18,'temp_min': 6.18, 'temp_max': 6.88, 'pressure': 997.92, 'sea_level': 1005.62, 'grnd_level': 997.92, 'humidity': 99, 'temp_kf': -0.7}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10n'}], 'clouds': {'all': 92}, 'wind': {'speed': 4.08, 'deg': 223.002}, 'rain': {'3h': 2.495}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-10 06:00:00'},{'dt': 1549789200, 'main': {'temp': 5.45, 'temp_min': 5.45, 'temp_max': 5.98, 'pressure': 997.75, 'sea_level': 1005.25, 'grnd_level': 997.75, 'humidity': 100, 'temp_kf': -0.53}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10d'}], 'clouds': {'all': 92}, 'wind': {'speed': 2.25, 'deg': 308.501}, 'rain': {'3h': 1.26}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-10 09:00:00'},
          {'dt': 1549800000, 'main': {'temp': 4.86, 'temp_min': 4.86, 'temp_max': 5.21, 'pressure': 999.6, 'sea_level': 1007.14, 'grnd_level': 999.6, 'humidity': 100, 'temp_kf': -0.35}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10d'}], 'clouds': {'all': 100}, 'wind': {'speed': 4.26, 'deg': 332.006}, 'rain': {'3h': 1.095}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-10 12:00:00'},
        {'dt': 1549810800, 'main': {'temp': 5.7, 'temp_min': 5.7, 'temp_max': 5.87, 'pressure': 1003.61, 'sea_level': 1011.25, 'grnd_level': 1003.61, 'humidity': 98, 'temp_kf': -0.18}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10d'}], 'clouds': {'all': 92}, 'wind': {'speed': 5.16, 'deg': 291.503}, 'rain': {'3h': 1.24}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-10 15:00:00'}, {'dt': 1549821600, 'main': {'temp': 4.48, 'temp_min': 4.48, 'temp_max': 4.48, 'pressure': 1009.38, 'sea_level': 1017.03, 'grnd_level': 1009.38, 'humidity': 96, 'temp_kf': 0}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10n'}], 'clouds': {'all': 48}, 'wind': {'speed': 6.61, 'deg': 299.003}, 'rain': {'3h': 1.925}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-10 18:00:00'}, {'dt': 1549832400, 'main': {'temp': 3.47, 'temp_min': 3.47, 'temp_max': 3.47, 'pressure': 1012.74, 'sea_level': 1020.45, 'grnd_level': 1012.74, 'humidity': 95, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'clouds': {'all': 24}, 'wind': {'speed': 4.91, 'deg': 272}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-10 21:00:00'},
        {'dt': 1549843200, 'main': {'temp': 3.23, 'temp_min': 3.23, 'temp_max': 3.23, 'pressure': 1013.58, 'sea_level': 1021.29, 'grnd_level': 1013.58, 'humidity': 100, 'temp_kf': 0}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10n'}], 'clouds': {'all': 92}, 'wind': {'speed': 3.02, 'deg': 228.003}, 'rain': {'3h': 1.98}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-11 00:00:00'}, {'dt': 1549854000, 'main': {'temp': 4.62, 'temp_min': 4.62, 'temp_max': 4.62, 'pressure': 1016.43, 'sea_level': 1024.26, 'grnd_level': 1016.43, 'humidity': 100, 'temp_kf': 0}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10n'}], 'clouds': {'all': 48}, 'wind': {'speed': 2.51, 'deg': 345.001}, 'rain': {'3h': 0.99}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-11 03:00:00'}, {'dt': 1549864800, 'main': {'temp': 1.63, 'temp_min': 1.63, 'temp_max': 1.63, 'pressure': 1022.42, 'sea_level': 1030.26, 'grnd_level': 1022.42, 'humidity': 100, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01n'}], 'clouds': {'all': 0}, 'wind': {'speed': 3.77, 'deg': 338.003}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-11 06:00:00'},
        {'dt': 1549875600, 'main': {'temp': 2.42, 'temp_min': 2.42, 'temp_max': 2.42, 'pressure': 1027.11, 'sea_level': 1034.98, 'grnd_level': 1027.11, 'humidity': 99, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d'}], 'clouds': {'all': 0}, 'wind': {'speed': 4.01, 'deg': 317.005}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-11 09:00:00'}, {'dt': 1549886400, 'main': {'temp': 6.33, 'temp_min': 6.33, 'temp_max': 6.33, 'pressure': 1030.83, 'sea_level': 1038.55, 'grnd_level': 1030.83, 'humidity': 100, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02d'}], 'clouds': {'all': 12}, 'wind': {'speed': 3.23, 'deg': 321.006}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-11 12:00:00'}, {'dt': 1549897200, 'main': {'temp': 7.38, 'temp_min': 7.38, 'temp_max': 7.38, 'pressure': 1033.13, 'sea_level': 1040.94, 'grnd_level': 1033.13, 'humidity': 98, 'temp_kf': 0}, 'weather': [{'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04d'}], 'clouds': {'all': 56}, 'wind': {'speed': 2.66, 'deg': 305.001}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-11 15:00:00'},
        {'dt': 1549908000, 'main': {'temp': 4.6, 'temp_min': 4.6, 'temp_max': 4.6, 'pressure': 1035.26, 'sea_level': 1043.1, 'grnd_level': 1035.26, 'humidity': 95, 'temp_kf': 0}, 'weather': [{'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04n'}], 'clouds': {'all': 80}, 'wind': {'speed': 1.62, 'deg': 265.004}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-11 18:00:00'}, {'dt': 1549918800, 'main': {'temp': 4.95, 'temp_min': 4.95, 'temp_max': 4.95, 'pressure': 1036.7, 'sea_level': 1044.54, 'grnd_level': 1036.7, 'humidity': 97, 'temp_kf': 0}, 'weather': [{'id': 804, 'main': 'Clouds', 'description': 'overcast clouds', 'icon': '04n'}], 'clouds': {'all': 88}, 'wind': {'speed': 2.12, 'deg': 240.001}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-11 21:00:00'}, {'dt': 1549929600, 'main': {'temp': 2.14, 'temp_min': 2.14, 'temp_max': 2.14, 'pressure': 1037.17, 'sea_level': 1045.12, 'grnd_level': 1037.17, 'humidity': 98, 'temp_kf': 0}, 'weather': [{'id': 802, 'main': 'Clouds', 'description': 'scattered clouds', 'icon': '03n'}], 'clouds': {'all': 36}, 'wind': {'speed': 1.61, 'deg': 201.005}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-12 00:00:00'},
        {'dt': 1549940400, 'main': {'temp': 2.03, 'temp_min': 2.03, 'temp_max': 2.03, 'pressure': 1036.95, 'sea_level': 1044.92, 'grnd_level': 1036.95, 'humidity': 100, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'clouds': {'all': 20}, 'wind': {'speed': 3.16, 'deg': 219.004}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-12 03:00:00'}, {'dt': 1549951200, 'main': {'temp': 2.02, 'temp_min': 2.02, 'temp_max': 2.02, 'pressure': 1036.45, 'sea_level': 1044.39, 'grnd_level': 1036.45, 'humidity': 98, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'clouds': {'all': 20}, 'wind': {'speed': 3.26, 'deg': 217.501}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-12 06:00:00'}, {'dt': 1549962000, 'main': {'temp': 4.73, 'temp_min': 4.73, 'temp_max': 4.73, 'pressure': 1036.75, 'sea_level': 1044.6, 'grnd_level': 1036.75, 'humidity': 98, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02d'}], 'clouds': {'all': 24}, 'wind': {'speed': 3.91, 'deg': 216.005}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-12 09:00:00'},
        {'dt': 1549972800, 'main': {'temp': 9.1, 'temp_min': 9.1, 'temp_max': 9.1, 'pressure': 1036.22, 'sea_level': 1043.98, 'grnd_level': 1036.22, 'humidity': 94, 'temp_kf': 0}, 'weather': [{'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04d'}], 'clouds': {'all': 64}, 'wind': {'speed': 4.78, 'deg': 222.004}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-12 12:00:00'}, {'dt': 1549983600, 'main': {'temp': 10.45, 'temp_min': 10.45, 'temp_max': 10.45, 'pressure': 1034.93, 'sea_level': 1042.72, 'grnd_level': 1034.93, 'humidity': 83, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '02d'}], 'clouds': {'all': 8}, 'wind': {'speed': 5.66, 'deg': 228.003}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-12 15:00:00'}, {'dt': 1549994400, 'main': {'temp': 8.85, 'temp_min': 8.85, 'temp_max': 8.85, 'pressure': 1035.3, 'sea_level': 1043.09, 'grnd_level': 1035.3, 'humidity': 78, 'temp_kf': 0}, 'weather': [{'id': 802, 'main': 'Clouds', 'description': 'scattered clouds', 'icon': '03n'}], 'clouds': {'all': 44}, 'wind': {'speed': 5.12, 'deg': 232}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-12 18:00:00'},
        {'dt': 1550005200, 'main': {'temp': 8.43, 'temp_min': 8.43, 'temp_max': 8.43, 'pressure': 1035.98, 'sea_level': 1043.79, 'grnd_level': 1035.98, 'humidity': 85, 'temp_kf': 0}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10n'}], 'clouds': {'all': 64}, 'wind': {'speed': 4.73, 'deg': 236.007}, 'rain': {'3h': 0.039999999999999}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-12 21:00:00'}, {'dt': 1550016000, 'main': {'temp': 7.61, 'temp_min': 7.61, 'temp_max': 7.61, 'pressure': 1036.39, 'sea_level': 1044.16, 'grnd_level': 1036.39, 'humidity': 93, 'temp_kf': 0}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10n'}], 'clouds': {'all': 56}, 'wind': {'speed': 4.36, 'deg': 238.505}, 'rain': {'3h': 0.030000000000001}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-13 00:00:00'}, {'dt': 1550026800, 'main': {'temp': 7.69, 'temp_min': 7.69, 'temp_max': 7.69, 'pressure': 1036.23, 'sea_level': 1044.06, 'grnd_level': 1036.23, 'humidity': 88, 'temp_kf': 0}, 'weather': [{'id': 500, 'main': 'Rain', 'description': 'light rain', 'icon': '10n'}], 'clouds': {'all': 80}, 'wind': {'speed': 3.77, 'deg': 238.501}, 'rain': {'3h': 0.039999999999999}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-13 03:00:00'},
        {'dt': 1550037600, 'main': {'temp': 6.99, 'temp_min': 6.99, 'temp_max': 6.99, 'pressure': 1036.16, 'sea_level': 1044.02, 'grnd_level': 1036.16, 'humidity': 92, 'temp_kf': 0}, 'weather': [{'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04n'}], 'clouds': {'all': 56}, 'wind': {'speed': 3.56, 'deg': 230.002}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-13 06:00:00'}, {'dt': 1550048400, 'main': {'temp': 7.03, 'temp_min': 7.03, 'temp_max': 7.03, 'pressure': 1036.63, 'sea_level': 1044.45, 'grnd_level': 1036.63, 'humidity': 92, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02d'}], 'clouds': {'all': 20}, 'wind': {'speed': 3.87, 'deg': 219.001}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-13 09:00:00'}, {'dt': 1550059200, 'main': {'temp': 10.66, 'temp_min': 10.66, 'temp_max': 10.66, 'pressure': 1036.89, 'sea_level': 1044.66, 'grnd_level': 1036.89, 'humidity': 77, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02d'}], 'clouds': {'all': 12}, 'wind': {'speed': 4.81, 'deg': 222.504}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-13 12:00:00'},
        {'dt': 1550070000, 'main': {'temp': 11.34, 'temp_min': 11.34, 'temp_max': 11.34, 'pressure': 1036.56, 'sea_level': 1044.29, 'grnd_level': 1036.56, 'humidity': 69, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02d'}], 'clouds': {'all': 20}, 'wind': {'speed': 4.72, 'deg': 218.507}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-13 15:00:00'}, {'dt': 1550080800, 'main': {'temp': 8.06, 'temp_min': 8.06, 'temp_max': 8.06, 'pressure': 1036.5, 'sea_level': 1044.39, 'grnd_level': 1036.5, 'humidity': 68, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'clouds': {'all': 24}, 'wind': {'speed': 3.9, 'deg': 205.003}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-13 18:00:00'}, {'dt': 1550091600, 'main': {'temp': 5.64, 'temp_min': 5.64, 'temp_max': 5.64, 'pressure': 1036.85, 'sea_level': 1044.68, 'grnd_level': 1036.85, 'humidity': 80, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'clouds': {'all': 20}, 'wind': {'speed': 3.67, 'deg': 203.502}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-13 21:00:00'},
        {'dt': 1550102400, 'main': {'temp': 5.09, 'temp_min': 5.09, 'temp_max': 5.09, 'pressure': 1036.73, 'sea_level': 1044.7, 'grnd_level': 1036.73, 'humidity': 87, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'clouds': {'all': 20}, 'wind': {'speed': 3.57, 'deg': 203.003}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-14 00:00:00'}, {'dt': 1550113200, 'main': {'temp': 4.64, 'temp_min': 4.64, 'temp_max': 4.64, 'pressure': 1036.53, 'sea_level': 1044.47, 'grnd_level': 1036.53, 'humidity': 87, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02n'}], 'clouds': {'all': 24}, 'wind': {'speed': 3.36, 'deg': 204}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-14 03:00:00'}, {'dt': 1550124000, 'main': {'temp': 3.4, 'temp_min': 3.4, 'temp_max': 3.4, 'pressure': 1036.09, 'sea_level': 1044.08, 'grnd_level': 1036.09, 'humidity': 91, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '02n'}], 'clouds': {'all': 8}, 'wind': {'speed': 3.22, 'deg': 195.5}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-14 06:00:00'},
        {'dt': 1550134800, 'main': {'temp': 5.25, 'temp_min': 5.25, 'temp_max': 5.25, 'pressure': 1036.45, 'sea_level': 1044.42, 'grnd_level': 1036.45, 'humidity': 80, 'temp_kf': 0}, 'weather': [{'id': 801, 'main': 'Clouds', 'description': 'few clouds', 'icon': '02d'}], 'clouds': {'all': 12}, 'wind': {'speed': 3.48, 'deg': 189.503}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-14 09:00:00'}, {'dt': 1550145600, 'main': {'temp': 11.05, 'temp_min': 11.05, 'temp_max': 11.05, 'pressure': 1036.58, 'sea_level': 1044.31, 'grnd_level': 1036.58, 'humidity': 66, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d'}], 'clouds': {'all': 0}, 'wind': {'speed': 3.4, 'deg': 188.001}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-14 12:00:00'}, {'dt': 1550156400, 'main': {'temp': 12.41, 'temp_min': 12.41, 'temp_max': 12.41, 'pressure': 1035.29, 'sea_level': 1042.94, 'grnd_level': 1035.29, 'humidity': 57, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '01d'}], 'clouds': {'all': 0}, 'wind': {'speed': 3.56, 'deg': 185.005}, 'rain': {}, 'sys': {'pod': 'd'}, 'dt_txt': '2019-02-14 15:00:00'},
        {'dt': 1550167200, 'main': {'temp': 7.51, 'temp_min': 7.51, 'temp_max': 7.51, 'pressure': 1034.67, 'sea_level': 1042.53, 'grnd_level': 1034.67, 'humidity': 57, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '02n'}], 'clouds': {'all': 8}, 'wind': {'speed': 3.16, 'deg': 168.504}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-14 18:00:00'}, {'dt': 1550178000, 'main': {'temp': 5.09, 'temp_min': 5.09, 'temp_max': 5.09, 'pressure': 1034.25, 'sea_level': 1042.11, 'grnd_level': 1034.25, 'humidity': 81, 'temp_kf': 0}, 'weather': [{'id': 800, 'main': 'Clear', 'description': 'clear sky', 'icon': '02n'}], 'clouds': {'all': 8}, 'wind': {'speed': 3.5, 'deg': 162.509}, 'rain': {}, 'sys': {'pod': 'n'}, 'dt_txt': '2019-02-14 21:00:00'}], 'city': {'id': 2643743, 'name': 'London', 'coord': {'lat': 51.5073, 'lon': -0.1277}, 'country': 'GB', 'population': 1000000}};

         weatherService.searchWeatherForCity.and.returnValue(Observable.of(postsToReturn));

         const expectedResult = new weatherActions.AddNewCitySuccess(postsToReturn);

        runner.queue(new weatherActions.AddNewCity('London'));

        weatherEffects.addNewCity$.subscribe(result => {
          expect(result).toEqual(expectedResult);
        });

      });
});
