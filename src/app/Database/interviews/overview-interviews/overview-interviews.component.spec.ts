import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewInterviewsComponent } from './overview-interviews.component';

describe('OverviewInterviewsComponent', () => {
  let component: OverviewInterviewsComponent;
  let fixture: ComponentFixture<OverviewInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewInterviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
