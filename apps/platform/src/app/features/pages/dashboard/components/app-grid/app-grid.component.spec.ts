import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppGridComponent } from './app-grid.component';

describe('AppGrid', () => {
  let component: AppGridComponent;
  let fixture: ComponentFixture<AppGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppGridComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
