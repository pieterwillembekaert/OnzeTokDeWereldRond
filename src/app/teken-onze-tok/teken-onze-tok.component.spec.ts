import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TekenOnzeTokComponent } from './teken-onze-tok.component';

describe('TekenOnzeTokComponent', () => {
  let component: TekenOnzeTokComponent;
  let fixture: ComponentFixture<TekenOnzeTokComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TekenOnzeTokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TekenOnzeTokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
