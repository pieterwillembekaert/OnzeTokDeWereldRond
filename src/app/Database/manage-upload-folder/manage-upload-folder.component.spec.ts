import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadFolderComponent } from './manage-upload-folder.component';

describe('ManageUploadFolderComponent', () => {
  let component: ManageUploadFolderComponent;
  let fixture: ComponentFixture<ManageUploadFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUploadFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUploadFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
