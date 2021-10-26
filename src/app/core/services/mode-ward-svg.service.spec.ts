import { TestBed } from '@angular/core/testing';

import { ModeWardSvgService } from './mode-ward-svg.service';

describe('ModeWardSvgService', () => {
  let service: ModeWardSvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeWardSvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
