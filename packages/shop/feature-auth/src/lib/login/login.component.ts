import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormField, FormUiComponent } from '@mercatura/ui';
import { RouterLink } from '@angular/router';
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
  private readonly AUTH: AuthService = inject(AuthService);
  private readonly ROUTER: Router = inject(Router);

  public readonly LOADING: WritableSignal<boolean> = signal<boolean>(false);
  public readonly ERROR: WritableSignal<string | null> = signal<string | null>(null);

  private readonly CREDENTIALS: LoginRequest = {
    email: '' as string,
    password: '' as string,
  } as LoginRequest;

  public readonly FORM_CONFIG: FormConfig = {
    fields: LOGIN_FORM_FIELDS.map((formField) => {
      if (formField.id === 'email') {
        formField.onValueChange = (v) => this.CREDENTIALS.email = v;
      }

      if (formField.id === 'password') {
        formField.onValueChange = (v) => this.CREDENTIALS.password = v
      }
      return {...formField} as FormField;
    }) as FormField[],
    submitLabel: 'Sign In' as string,
    loadingLabel: 'Signing in...' as string,
  } as FormConfig;

  public onSubmit(): void {
    this.LOADING.set(true);
    this.ERROR.set(null);

    this.AUTH.login(this.CREDENTIALS).subscribe({
      next: () => {
        this.LOADING.set(false),
        this.ROUTER.navigate(['/products']);
      },
      error: (err: any) => {
        this.LOADING.set(false);
        this.ERROR.set(err.error?.message ?? 'Login failed. Please try again.');
      },
    });
  }
}





