import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'lib-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  public readonly title: InputSignal<string> =
    input<string>('Are you sure?');
  public readonly message: InputSignal<string> =
    input<string>('This action cannot be undone.');
  public readonly confirmLabel: InputSignal<string> =
    input<string>('Confirm');
  public readonly cancelLabel: InputSignal<string> = 
    input<string>('Cancel');
  public readonly danger: InputSignal<boolean> =
    input<boolean>(false);
  public readonly loading: InputSignal<boolean> =
    input<boolean>(false);

  public readonly confirmed: OutputEmitterRef<void> =
    output<void>();
  public readonly cancelled: OutputEmitterRef<void> =
    output<void>();
}
