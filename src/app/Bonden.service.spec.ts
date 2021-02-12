/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BondenService } from './Bonden.service';

describe('Service: Bonden', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BondenService]
    });
  });

  it('should ...', inject([BondenService], (service: BondenService) => {
    expect(service).toBeTruthy();
  }));
});
