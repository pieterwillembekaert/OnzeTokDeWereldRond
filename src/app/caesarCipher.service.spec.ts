/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CaesarCipherService } from './caesarCipher.service';

describe('Service: CaesarCipher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaesarCipherService]
    });
  });

  it('should ...', inject([CaesarCipherService], (service: CaesarCipherService) => {
    expect(service).toBeTruthy();
  }));
});
