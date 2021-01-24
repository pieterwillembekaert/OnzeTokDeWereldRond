/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GrafiekAfstandComponent } from './GrafiekAfstand.component';

describe('GrafiekAfstandComponent', () => {
  let component: GrafiekAfstandComponent;
  let fixture: ComponentFixture<GrafiekAfstandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafiekAfstandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafiekAfstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
