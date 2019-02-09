import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromWeather from '../../store/reducers/weather';
import * as weatherActions from '../../store/actions/weather';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {

  city: FormControl;
  form: FormGroup;

  inProgress$: Observable<boolean>;

  constructor(private store: Store<fromWeather.State>) {
  }

  ngOnInit() {
    this.city = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      city: this.city
    });

    this.inProgress$ = this.store.pipe(select(fromWeather.getInProgress));
  }

  search() {
    this.store.dispatch(new weatherActions.AddNewCity(this.city.value));
  }
}
