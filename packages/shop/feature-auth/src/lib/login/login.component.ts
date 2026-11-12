import { Component, inject, input, signal } from '@angular/core';
import { FormUiComponent } from '@mercatura/ui';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormConfig } from '@mercatura/ui';
import { LoginRequest } from '@mercatura/models';
import { AuthService } from '@mercatura/shop/data';
import { Router } from '@angular/router';
import { LOGIN_FORM_FIELDS } from './LOGIN_FORM_FIELDS';

@Component({
  selector: 'lib-login',
  imports: [RouterLink, FormUiComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly redirectTo = input<string>(this.route.snapshot.data['redirectTo'] ?? '/dashboard');
  readonly middlePathList = input<string | undefined>(this.route.snapshot.data['middlePathList']);
  readonly authUserPath = input<string | undefined>(this.route.snapshot.data['authUserPath']);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  private readonly CREDENTIALS: LoginRequest = {
    email: '',
    password: '',
  };

  readonly FORM_CONFIG: FormConfig = {
    fields: LOGIN_FORM_FIELDS.map((formField) => {
      if (formField.id === 'email') formField.onValueChange = (v) => this.CREDENTIALS.email = v;
      if (formField.id === 'password') formField.onValueChange = (v) => this.CREDENTIALS.password = v;
      return {...formField};
    }),
    submitLabel: 'Sign In',
    loadingLabel: 'Signing in...',
  };

  onSubmit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.auth.login(
      this.CREDENTIALS,
      this.middlePathList(),
    ).subscribe({
      next: () => {
        this.loading.set(false),
        this.router.navigate([this.redirectTo()]);
      },
      error: (err: any) => {
        this.loading.set(false);
        this.error.set(err.error?.message ?? 'Login failed. Please try again.');
      },
    });
  }
}





