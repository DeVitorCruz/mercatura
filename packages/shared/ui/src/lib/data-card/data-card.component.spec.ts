import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataCardComponent } from './data-card.component';

describe('DataCard', () => {
  let component: DataCardComponent;
  let fixture: ComponentFixture<DataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
