import { NgClass } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trial-banner',
  imports: [RouterLink, NgClass],
  templateUrl: './trial-banner.component.html',
  styleUrl: './trial-banner.component.scss',
})
export class TrialBannerComponent {
  public readonly daysRemaining: InputSignal<number | null | undefined> =
    input<number | null | undefined>(null);
  public readonly status: InputSignal<string> = input<string>('trial');

  public getTrialClass(): string {
    const DAYS: number | null = this.daysRemaining()!;
    if (!DAYS || DAYS <= 0) return 'banner--danger';
    if (DAYS < 3) return 'banner--warning';
    return 'banner--info';
  }
}
