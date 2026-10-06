import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { ProfileService } from '@mercatura/shop/data';
import { ProfileTab } from '../../profile.interface';
import { DEFAULT_PROFILE_TABS } from '../../profile.interface';
import { ProfileResponse } from '@mercatura/models';
import { UpdateProfileRequest } from '@mercatura/models';
import { IconComponent } from '@mercatura/ui';
import { TitleCasePipe } from '@angular/common';
import { ProfileStateService } from '../../profile-state/profile-state.service';

@Component({
  selector: 'lib-layout',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, 
    IconComponent, TitleCasePipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  private readonly PROFILE_SVC: ProfileService = 
    inject(ProfileService);
  private readonly STATE: ProfileStateService = 
    inject(ProfileStateService);
  private readonly ROUTE: ActivatedRoute = 
    inject(ActivatedRoute);

  public readonly TABS: ProfileTab[] =
    this.ROUTE.snapshot.data['tabs'] ?? DEFAULT_PROFILE_TABS;
  public readonly SHOW_AVATAR: boolean = 
    this.ROUTE.snapshot.data['showAvatar'] ?? true;

  public readonly loading: WritableSignal<boolean> = 
    signal<boolean>(false);

  // ------ Expose state signals to template ---------------------
  public readonly data: Signal<ProfileResponse | null> =
    this.STATE.data;
  public readonly saving: Signal<boolean> =
    this.STATE.saving;
  public readonly success: Signal<boolean> = 
    this.STATE.success;
  public readonly error: Signal<string | null> =
    this.STATE.error;

  public ngOnInit(): void {
    // Register save function in state
    this.STATE.registerSaveFn((payload) => this._save(payload));
    this._load();
  }

  private _load(): void {
    this.loading.set(true);
    this.PROFILE_SVC.getProfile().subscribe({
      next: data => {
        this.STATE.setData(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private _save(payload: UpdateProfileRequest): void {
    this.STATE.setSaving(true);
    this.STATE.setError(null);
    this.STATE.setSuccess(false);

    this.PROFILE_SVC.updateProfile(payload).subscribe({
      next: data => {
        this.STATE.setData(data);
        this.STATE.setSaving(false);
        this.STATE.setSuccess(true);
        setTimeout(() => this.STATE.setSuccess(false), 3000);
      },
      error: () => {
        this.STATE.setSaving(false);
        this.STATE.setError('Failed to save. Please try again.');
      },
    });
  }

  public onAvatarChange(event: Event): void {
    const FILE: File = (event.target as HTMLInputElement).files?.[0]!;
    if (!FILE) return;
    this.PROFILE_SVC.updateAvatar(FILE).subscribe({
      next: data => this.STATE.setData(data),
    });
  }
}
