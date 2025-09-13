import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressTrackerPage } from './progress-tracker.page';

describe('ProgressTrackerPage', () => {
  let component: ProgressTrackerPage;
  let fixture: ComponentFixture<ProgressTrackerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
