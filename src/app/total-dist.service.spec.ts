import { TestBed } from '@angular/core/testing';

import { TotalDistService } from './total-dist.service';

describe('TotalDistService', () => {
  let service: TotalDistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalDistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
