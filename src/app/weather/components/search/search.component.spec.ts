import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { Store } from '@ngrx/store';
import { MockStore } from '../../../testing/mockstore';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let _store: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: Store, useValue: new MockStore( {
          weathers: [],
          inProgress: false,
          error: ''
        })}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    _store = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('store should be defined', () => {
    expect(_store).toBeDefined();
  });

});
