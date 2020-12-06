import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseLoginComponent } from './database-login.component';

describe('DatabaseLoginComponent', () => {
  let component: DatabaseLoginComponent;
  let fixture: ComponentFixture<DatabaseLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
