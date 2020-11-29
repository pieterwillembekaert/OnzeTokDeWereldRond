import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverOnsComponent } from './over-ons.component';

describe('OverOnsComponent', () => {
  let component: OverOnsComponent;
  let fixture: ComponentFixture<OverOnsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverOnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverOnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
