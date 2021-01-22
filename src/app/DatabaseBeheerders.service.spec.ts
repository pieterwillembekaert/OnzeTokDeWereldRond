/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatabaseBeheerdersService } from './DatabaseBeheerders.service';

describe('Service: DatabaseBeheerders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseBeheerdersService]
    });
  });

  it('should ...', inject([DatabaseBeheerdersService], (service: DatabaseBeheerdersService) => {
    expect(service).toBeTruthy();
  }));
});
