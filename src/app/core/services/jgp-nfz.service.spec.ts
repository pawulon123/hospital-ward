import { TestBed } from '@angular/core/testing';

import { JgpNfzService } from './jgp-nfz.service';

describe('JgpNfzService', () => {
  let service: JgpNfzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JgpNfzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
