import { TestBed } from '@angular/core/testing';

import { NieuweDeelnemerDataService } from './Database/nieuwe-deelnemer-data.service';

describe('NieuweDeelnemerDataService', () => {
  let service: NieuweDeelnemerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NieuweDeelnemerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
