import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeelnemenComponent } from './deelnemen.component';

describe('DeelnemenComponent', () => {
  let component: DeelnemenComponent;
  let fixture: ComponentFixture<DeelnemenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeelnemenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeelnemenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
