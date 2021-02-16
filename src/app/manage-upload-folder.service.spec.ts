import { TestBed } from '@angular/core/testing';

import { ManageUploadFolderService } from './Database/manage-upload-folder.service';

describe('ManageUploadFolderService', () => {
  let service: ManageUploadFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUploadFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
