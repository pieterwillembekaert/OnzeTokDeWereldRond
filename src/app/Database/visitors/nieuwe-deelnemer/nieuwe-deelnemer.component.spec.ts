import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuweDeelnemerComponent } from './nieuwe-deelnemer.component';

describe('NieuweDeelnemerComponent', () => {
  let component: NieuweDeelnemerComponent;
  let fixture: ComponentFixture<NieuweDeelnemerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NieuweDeelnemerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuweDeelnemerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
