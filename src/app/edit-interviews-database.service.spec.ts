import { TestBed } from '@angular/core/testing';

import { EditInterviewsDatabaseService } from './Database/interviews/edit-interviews-database.service';

describe('EditInterviewsDatabaseService', () => {
  let service: EditInterviewsDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditInterviewsDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
