import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToChantPage } from './how-to-chant.page';

describe('HowToChantPage', () => {
  let component: HowToChantPage;
  let fixture: ComponentFixture<HowToChantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToChantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
