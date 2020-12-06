import { TestBed } from '@angular/core/testing';

import { EditVisitorsDataService } from './Database/edit-visitors-data.service';

describe('EditVisitorsDataService', () => {
  let service: EditVisitorsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditVisitorsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
