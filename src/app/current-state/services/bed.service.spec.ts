import { TestBed } from '@angular/core/testing';

import { BedService } from './bed.service';

describe('BedService', () => {
  let bedService: BedService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    bedService = new BedService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(bedService).toBeTruthy();
  });
});
