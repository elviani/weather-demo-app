import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './results.component';
import { Store } from '@ngrx/store';
import { MockStore } from '../../../testing/mockstore';
import mockResponse from '../../../testing/mockresponse';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let _store: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: Store, useValue: new MockStore( {
          weathers: [],
          inProgress: false,
          error: ''
        })}
      ],
      schemas: [ NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    _store = fixture.debugElement.injector.get(Store);
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('store should be defined', () => {
    expect(_store).toBeDefined();
  });

  it('getTemperature return the correct temperature', () => {
    const response = mockResponse;

    expect(component.getTemperature(response.list, 6)).toBe(6.18);
    expect(component.getTemperature(response.list, 12)).toBe(4.86);
    expect(component.getTemperature(response.list, 18)).toBe(4.48);
    expect(component.getTemperature(response.list, 0)).toBe(3.23);
  });

});
