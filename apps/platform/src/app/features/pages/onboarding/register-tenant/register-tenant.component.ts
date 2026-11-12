import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformService } from '@mercatura/shop/data';
import { SelectableCardItem, SelectableCardComponent, 
  FormConfig, FormUiComponent } from '@mercatura/ui';
import { AppTheme } from '@mercatura/models';
import { WizardLayoutComponent, WizardStep } from '@mercatura/templates';
import { WIZARD_STEPS } from './steps/WIZARD_STEPS';
import { STEP1_FORM } from './steps/step-1/STEP1_FORM';
import { STEP2_FORM } from './steps/step-2/STEP2_FORM';
import { TenantCacheService } from '@mercatura/shop/data';

@Component({
  selector: 'app-register-tenant',
  imports: [WizardLayoutComponent, FormUiComponent, 
    FormsModule, SelectableCardComponent],
  templateUrl: './register-tenant.component.html',
  styleUrl: './register-tenant.component.scss',
})
export class RegisterTenantComponent implements OnInit {
  private readonly platform = inject(PlatformService);
  private readonly router = inject(Router);
  private readonly cache = inject(TenantCacheService);

  readonly step = signal<number>(1);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  // ----- Wizard config --------------------------------
  readonly WIZARD_STEPS: WizardStep[] = WIZARD_STEPS;

  // ----- Step 1 state --------------------------------
  readonly planCards = signal<SelectableCardItem[]>([]);
  tenantName: string = '';
  tenantSlug: string = '';
  selectedPlan: string = 'free';

  // ----- Step 2 state --------------------------------
  readonly themeCards = signal<SelectableCardItem[]>([]);
  appName: string = '';
  selectedTheme: string = 'ecommerce-classic';
  
  // ----- Form configs --------------------------------
  readonly STEP1_FORM: FormConfig = {
    ...STEP1_FORM,
    fields: STEP1_FORM.fields.map(field => {
      if (field.id === 'name') field.onValueChange = (v: string) => this.onNameInput(v); 
      if (field.id === 'slug') field.onValueChange = (v: string) => this.tenantSlug = v;
      return field;
    }),
  };

  readonly STEP2_FORM: FormConfig = {
    ...STEP2_FORM,
    fields: STEP2_FORM.fields.map(field => {
      if (field.id === 'appName') field.onValueChange = (v: string) => this.appName = v; 
      return field;
    }),
  };

  ngOnInit(): void {
    this._loadPlans();
  }

  private _loadPlans(): void {
    this.platform.getPlans().subscribe({
      next: (plans) => {
        this.planCards.set(plans.map(p => ({
          id: p.slug,
          title:  p.name,
          subtitle:  p.price_monthly === '0.00' ? 
            'Free' : `$${p.price_monthly}/mo`,
          description:  '',
          badge:  '',
          meta:  [
            `${p.max_apps} app(s)`,
            `${p.max_products} producs`,
            `${p.max_domains} domain(s)`,
          ],
        })));
      },
    });
  }

  private _loadThemes(): void {
    this.platform.getThemes().subscribe({
      next: (themes) => {
        this.themeCards.set(themes.map(t => ({
          id: t.slug,
          title:  t.name,
          description:  t.description,
          badge:  t.is_default ? 'Default' : undefined,
        })));
        const DEF: AppTheme = themes.find(t => t.is_default)!;
        if (DEF) this.selectedTheme = DEF.slug;
      },
    });
  }

  onNameInput(value: string): void {
    this.tenantName = value;
    this.tenantSlug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  onStep1Submit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.platform.createTenant({
      name: this.tenantName,
      slug: this.tenantSlug,
      plan_slug: this.selectedPlan,
    }).subscribe({
      next: () => {
          this.loading.set(false);
          this._loadThemes();
        this.step.set(2);
      },
      error: (err: any) => {
        this.loading.set(false);
        if (err.status === 409) {
          this.router.navigate(['/dashboard']);
        } else if (err.status === 422) {
          const E: any = err.error?.errors;
          this.error.set(
            E?.slug?.[0] ?? E?.name?.[0]?? 'Validation error.'
          );
        } else {
          this.error.set('Something went wrong. Please try again.');
        }
      },
    });
  }

  onStep2Submit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.platform.createApp({
      name: this.appName,
      app_type_slug: 'ecommerce',
      theme_slug: this.selectedTheme,
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.cache.setValid(); // <- allow dashboard access
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading.set(false);
        this.error.set(err.status === 403
          ? 'App limit reached for your plan.' 
          : 'Failed to create app. Please try again.'
        );
      },
    });
  }
}
