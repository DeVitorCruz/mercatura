import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectableCardComponent } from './selectable-card.component';

describe('SelectableCard', () => {
  let component: SelectableCardComponent;
  let fixture: ComponentFixture<SelectableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectableCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectableCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
