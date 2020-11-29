import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TekenOnzeTokComponent } from './teken-onze-tok.component';

describe('TekenOnzeTokComponent', () => {
  let component: TekenOnzeTokComponent;
  let fixture: ComponentFixture<TekenOnzeTokComponent>;

  beforeEach(async(() => {
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
