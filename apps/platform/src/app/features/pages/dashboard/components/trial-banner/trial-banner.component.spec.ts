import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrialBannerComponent } from './trial-banner.component';

describe('TrialBanner', () => {
  let component: TrialBannerComponent;
  let fixture: ComponentFixture<TrialBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrialBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrialBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
