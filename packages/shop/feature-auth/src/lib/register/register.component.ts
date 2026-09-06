import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormUiComponent, FormConfig, FormField } from '@mercatura/ui';
import { REGISTER_FORM_FIELDS } from './REGISTER_FORM_FIELDS';
import { AuthService } from '@mercatura/shop/data';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '@mercatura/models';

@Component({
  selector: 'lib-register',
  imports: [RouterLink, FormUiComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly AUTH: AuthService = inject(AuthService);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ERROR: WritableSignal<string | null> = signal<string | null>(null);

  private readonly CREDENTIALS: RegisterRequest = {
    name: '' as string,
    email: '' as string,
    password: '' as string,
    password_confirmation: '' as string,
  } as RegisterRequest;

  public readonly FORM_CONFIG: FormConfig = {
    fields: REGISTER_FORM_FIELDS.map<FormField>((formField) => {
      if (formField.id === 'name') {
        formField.onValueChange = (v) => this.CREDENTIALS.name = v;
      }

      if (formField.id === 'email') {
        formField.onValueChange = (v) => this.CREDENTIALS.email = v;
      }

      if (formField.id === 'password') {
        formField.onValueChange = (v) => this.CREDENTIALS.password = v;
      }

      if (formField.id === 'password_confirmation') {
        formField.onValueChange = (v) => this.CREDENTIALS.password_confirmation = v;
      }
      return {...formField} as FormField;
    }) as FormField[],
    submitLabel: 'Create Account' as string,
    loadingLabel: 'Create account...' as string,
  } as FormConfig;

  public onSubmit(): void {
    this.LOADING.set(true);
    this.ERROR.set(null);

    this.AUTH.register(this.CREDENTIALS).subscribe({
      next: () => {
        this.LOADING.set(false);
        this.ROUTER.navigate(['/products']);
      },
      error: (err: any) => {
        this.LOADING.set(false);
        this.ERROR.set(err.error?.message ?? 'Registration failed. Please try again.');
      },
    });
  }
}
