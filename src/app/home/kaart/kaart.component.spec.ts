import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaartComponent } from './kaart.component';

describe('KaartComponent', () => {
  let component: KaartComponent;
  let fixture: ComponentFixture<KaartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
