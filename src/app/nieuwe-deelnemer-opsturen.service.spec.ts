import { TestBed } from '@angular/core/testing';

import { NieuweDeelnemerOpsturenService } from './deelnemen/nieuwe-deelnemer-opsturen.service';

describe('NieuweDeelnemerOpsturenService', () => {
  let service: NieuweDeelnemerOpsturenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NieuweDeelnemerOpsturenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
