import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shopus } from './shopus';

describe('Shopus', () => {
  let component: Shopus;
  let fixture: ComponentFixture<Shopus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shopus],
    }).compileComponents();

    fixture = TestBed.createComponent(Shopus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
