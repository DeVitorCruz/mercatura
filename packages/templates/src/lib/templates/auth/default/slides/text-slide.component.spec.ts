import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextSlideComponent } from './text-slide.component';

describe('TextSlide', () => {
  let component: TextSlideComponent;
  let fixture: ComponentFixture<TextSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSlideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextSlideComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
