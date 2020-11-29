import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PrikbordComponent } from './prikbord.component';

describe('PrikbordComponent', () => {
  let component: PrikbordComponent;
  let fixture: ComponentFixture<PrikbordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrikbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
