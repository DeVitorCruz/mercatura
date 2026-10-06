import { Component, inject, OnInit, signal, 
  WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformService } from '@mercatura/shop/data';
import { SelectableCardItem, SelectableCardComponent, 
  FormConfig, FormField, FormUiComponent } from '@mercatura/ui';
import { AppTheme, CreateAppRequest, CreateTenantRequest,
  Plan } from '@mercatura/models';
import { WizardLayoutComponent, WizardStep } from '@mercatura/templates';
import { WIZARD_STEPS } from './steps/WIZARD_STEPS';
import { STEP1_FORM } from './steps/step-1/STEP1_FORM';
import { STEP2_FORM } from './steps/step-2/STEP2_FORM';

@Component({
  selector: 'app-register-tenant',
  imports: [WizardLayoutComponent, FormUiComponent, 
    FormsModule, SelectableCardComponent],
  templateUrl: './register-tenant.component.html',
  styleUrl: './register-tenant.component.scss',
})
export class RegisterTenantComponent implements OnInit {
  private readonly PLATFORM: PlatformService = 
    inject(PlatformService);
  private readonly ROUTER: Router = inject(Router);
  
  public readonly step: WritableSignal<number> =
    signal<number>(1);
  public readonly loading: WritableSignal<boolean> =
    signal<boolean>(false);
  public readonly error: WritableSignal<string | null> =
    signal<string | null>(null);

  // ----- Wizard config --------------------------------
  public readonly WIZARD_STEPS: WizardStep[] = WIZARD_STEPS;

  // ----- Step 1 state --------------------------------
  public readonly planCards: WritableSignal<SelectableCardItem[]> =
    signal<SelectableCardItem[]>([]);
  public tenantName: string = '';
  public tenantSlug: string = '';
  public selectedPlan: string = 'free';

  // ----- Step 2 state --------------------------------
  public readonly themeCards: WritableSignal<SelectableCardItem[]> =
    signal<SelectableCardItem[]>([]);
  public appName: string = '';
  public selectedTheme: string = 'ecommerce-classic';
  
  // ----- Form configs --------------------------------
  public readonly STEP1_FORM: FormConfig = {
    ...STEP1_FORM,
    fields: STEP1_FORM.fields.map(field => {
      if (field.id === 'name') { 
        field.onValueChange = 
          (v: string) => this.onNameInput(v); 
      }

      if (field.id === 'slug') {
        field.onValueChange = 
          (v: string) => this.tenantSlug = v;
      }

      return field as FormField;
    }),
  } as FormConfig;

  public readonly STEP2_FORM: FormConfig = {
    ...STEP2_FORM,
    fields: STEP2_FORM.fields.map(field => {
      if (field.id === 'appName') { 
        field.onValueChange = 
          (v: string) => this.appName = v; 
      }

      return field as FormField;
    }),
  } as FormConfig;

  public ngOnInit(): void {
    this._loadPlans();
  }

  private _loadPlans(): void {
    this.PLATFORM.getPlans().subscribe({
      next: (plans: Plan[]) => {
        this.planCards.set(plans.map(p => ({
          id: p.slug as string | number,
          title:  p.name as string,
          subtitle:  p.price_monthly === '0.00' ? 
            'Free' : `$${p.price_monthly}/mo` as string,
          description:  '' as string,
          badge:  '' as string,
          meta:  [
            `${p.max_apps} app(s)`,
            `${p.max_products} producs`,
            `${p.max_domains} domain(s)`,
          ] as string[],
        }as SelectableCardItem)));
      },
    });
  }

  private _loadThemes(): void {
    this.PLATFORM.getThemes().subscribe({
      next: (themes: AppTheme[]) => {
        this.themeCards.set(themes.map(t => ({
          id: t.slug as string | number,
          title:  t.name as string,
          description:  t.description as string,
          badge:  t.is_default ? 'Default' : undefined as string | undefined,
        } as SelectableCardItem)));
        const DEF: AppTheme = themes.find(t => t.is_default)!;
        if (DEF) this.selectedTheme = DEF.slug;
      },
    });
  }

  public onNameInput(value: string): void {
    this.tenantName = value;
    this.tenantSlug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  public onStep1Submit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.PLATFORM.createTenant({
      name: this.tenantName as string,
      slug: this.tenantSlug as string,
      plan_slug: this.selectedPlan as string,
    } as CreateTenantRequest).subscribe({
      next: () => {
          this.loading.set(false);
          this._loadThemes();
        this.step.set(2);
      },
      error: (err: any) => {
        this.loading.set(false);
        if (err.status === 409) {
          this.ROUTER.navigate(['/dashboard']);
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

  public onStep2Submit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.PLATFORM.createApp({
      name: this.appName as string,
      app_type_slug: 'ecommerce' as string,
      theme_slug: this.selectedTheme as string,
    } as CreateAppRequest).subscribe({
      next: () => {
        this.loading.set(false);
        this.ROUTER.navigate(['/dashboard']);
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
