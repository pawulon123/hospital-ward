import { ComponentFixture, TestBed } from '@angular/core/testing';
import asyncData from 'src/testing/async-observable-helpers';
import { BedService } from '../../services/bed.service';

import { BedComponent } from './bed.component';

describe('BedComponent', () => {
  let component: BedComponent;
  let fixture: ComponentFixture<BedComponent>;

  const bedService = jasmine.createSpyObj('BedService', ['getBeds']);
  let getBedSpy = bedService.getBeds.and.returnValue(asyncData([]));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BedComponent ],
      providers: [{ provide: BedService, useValue: bedService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
