import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducers/weather';
import { WeatherEffects } from './store/effects/weather';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('weather', reducer),
    EffectsModule.forFeature([WeatherEffects])
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainer
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule  { }
