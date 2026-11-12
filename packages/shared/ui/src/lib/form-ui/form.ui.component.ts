import { Component, input, OnInit, output, signal, } from '@angular/core';
import { FormConfig, FormField } from './form-field.interface';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-ui-form',
  imports: [FormsModule, NgClass],
  templateUrl: './form.ui.component.html',
  styleUrl: './form.ui.component.scss',
})
export class FormUiComponent implements OnInit {
  readonly config = input.required<FormConfig>();
  readonly loading = input<boolean>(false);
  readonly error = input<string | null>(null);
  readonly formSubmit = output<Record<string, any>>();

  readonly values = signal<Record<string, any>>({});

  ngOnInit(): void {
    const INITIAL: Record<string, any> = {};
    this.config().fields.forEach(field => {
      INITIAL[field.id] = field.value ?? '';
    });
    this.values.set(INITIAL);
  }

  onValueChange(field: FormField, value: any): void {
    this.values.update(v => ({ ...v, [field.id]: value }));
    field.onValueChange?.(value);
  }

  onSubmit(): void {
    this.formSubmit.emit(this.values());
  }

  getSubmitLabel(): string {
    if (this.loading()) {
      return this.config().loadingLabel ?? 'Loading...';
    }
    return this.config().submitLabel ?? 'Submit';
  }
}
