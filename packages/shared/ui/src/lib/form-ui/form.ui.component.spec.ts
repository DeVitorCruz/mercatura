import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormUiComponent } from './form.ui.component';

describe('Form-ui', () => {
  let component: FormUiComponent;
  let fixture: ComponentFixture<FormUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormUiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
