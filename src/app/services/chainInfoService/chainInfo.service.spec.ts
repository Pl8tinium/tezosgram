import { TestBed } from '@angular/core/testing';

import { chainInfoService } from '../../contract.service';

describe('chainInfoService', () => {
  let service: chainInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(chainInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
