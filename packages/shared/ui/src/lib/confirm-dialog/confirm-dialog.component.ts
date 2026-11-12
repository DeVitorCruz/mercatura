import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  readonly title = input<string>('Are you sure?');
  readonly message = input<string>('This action cannot be undone.');
  readonly confirmLabel = input<string>('Confirm');
  readonly cancelLabel = input<string>('Cancel');
  readonly danger = input<boolean>(false);
  readonly loading = input<boolean>(false);

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
