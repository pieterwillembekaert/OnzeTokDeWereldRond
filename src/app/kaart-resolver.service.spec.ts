import { TestBed } from '@angular/core/testing';

import { KaartResolverService } from './home/kaart-resolver.service';

describe('KaartResolverService', () => {
  let service: KaartResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KaartResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
