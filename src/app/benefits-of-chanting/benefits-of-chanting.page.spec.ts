import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BenefitsOfChantingPage } from './benefits-of-chanting.page';

describe('BenefitsOfChantingPage', () => {
  let component: BenefitsOfChantingPage;
  let fixture: ComponentFixture<BenefitsOfChantingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsOfChantingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
