import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { FormUiComponent, FormConfig, FormField } from '@mercatura/ui';
import { REGISTER_FORM_FIELDS } from './REGISTER_FORM_FIELDS';
import { AuthService } from '@mercatura/shop/data';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '@mercatura/models';

@Component({
  selector: 'lib-register',
  imports: [RouterLink, FormUiComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly redirectTo = input<string>(
    this.route.snapshot.data['redirectTo'] ?? '/dashboard'
  );

  readonly middlePathList = input<string | undefined>(this.route.snapshot.data['middlePathList']);

  private readonly CREDENTIALS: RegisterRequest = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  readonly FORM_CONFIG: FormConfig = {
    fields: REGISTER_FORM_FIELDS.map<FormField>((formField) => {
      if (formField.id === 'name') formField.onValueChange = (v) => this.CREDENTIALS.name = v;
      if (formField.id === 'email') formField.onValueChange = (v) => this.CREDENTIALS.email = v;
      if (formField.id === 'password') formField.onValueChange = (v) => this.CREDENTIALS.password = v;
      if (formField.id === 'password_confirmation') formField.onValueChange = (v) => this.CREDENTIALS.password_confirmation = v;
      return {...formField};
    }),
    submitLabel: 'Create Account',
    loadingLabel: 'Create account...',
  };

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.auth.register(
      this.CREDENTIALS,
      this.middlePathList(),
    ).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate([this.redirectTo()]);
      },
      error: (err: any) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'Registration failed. Please try again.');
      },
    });
  }
}
