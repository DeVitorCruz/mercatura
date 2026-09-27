import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardLayoutComponent } from './layout.component';

describe('WizardLayout', () => {
  let component: WizardLayoutComponent;
  let fixture: ComponentFixture<WizardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
