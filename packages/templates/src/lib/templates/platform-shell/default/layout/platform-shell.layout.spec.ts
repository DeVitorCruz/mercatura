import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformShellLayout } from './platform-shell.layout';

describe('PlatformShellLayout', () => {
  let component: PlatformShellLayout;
  let fixture: ComponentFixture<PlatformShellLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformShellLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformShellLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
