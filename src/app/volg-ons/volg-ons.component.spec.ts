import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolgOnsComponent } from './volg-ons.component';

describe('VolgOnsComponent', () => {
  let component: VolgOnsComponent;
  let fixture: ComponentFixture<VolgOnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolgOnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolgOnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
