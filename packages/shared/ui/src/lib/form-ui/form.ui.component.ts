import { Component, input, InputSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
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
  public readonly config: InputSignal<FormConfig> = input.required<FormConfig>();
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly error: InputSignal<string | null> = input<string | null>(null);
  public readonly formSubmit: OutputEmitterRef<Record<string, any>> = output<Record<string, any>>();

  public readonly values: WritableSignal<Record<string, any>> = signal<Record<string, any>>({});

  public ngOnInit(): void {
    const INITIAL: Record<string, any> = {};
    this.config().fields.forEach(field => {
      INITIAL[field.id] = field.value ?? '';
    });
    this.values.set(INITIAL);
  }

  public onValueChange(field: FormField, value: any): void {
    this.values.update(v => ({ ...v, [field.id]: value }));
    field.onValueChange?.(value);
  }

  public onSubmit(): void {
    this.formSubmit.emit(this.values());
  }

  public getSubmitLabel(): string {
    if (this.loading()) {
      return this.config().loadingLabel ?? 'Loading...';
    }
    return this.config().submitLabel ?? 'Submit';
  }
}
