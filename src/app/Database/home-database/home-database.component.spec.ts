import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDatabaseComponent } from './home-database.component';

describe('HomeDatabaseComponent', () => {
  let component: HomeDatabaseComponent;
  let fixture: ComponentFixture<HomeDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
