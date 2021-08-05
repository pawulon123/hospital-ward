import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowInfoComponent } from './widow-info.component';

describe('WidowInfoComponent', () => {
  let component: WindowInfoComponent;
  let fixture: ComponentFixture<WindowInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
