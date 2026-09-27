import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterTenantComponent } from './register-tenant.component';

describe('RegisterTenant', () => {
  let component: RegisterTenantComponent;
  let fixture: ComponentFixture<RegisterTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTenantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterTenantComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
