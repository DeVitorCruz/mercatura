import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { ProfileService } from '@mercatura/shop/data';
import { ProfileTab } from '../../profile.interface';
import { DEFAULT_PROFILE_TABS } from '../../profile.interface';
import { ProfileResponse } from '@mercatura/models';
import { UpdateProfileRequest } from '@mercatura/models';
import { IconComponent } from '@mercatura/ui';
import { TitleCasePipe } from '@angular/common';

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
  private readonly ROUTE: ActivatedRoute = 
    inject(ActivatedRoute);

  public readonly TABS: ProfileTab[] =
    this.ROUTE.snapshot.data['tabs'] ?? DEFAULT_PROFILE_TABS;

  public readonly SHOW_AVATAR: boolean = 
    this.ROUTE.snapshot.data['showAvatar'] ?? true;

  public readonly data: WritableSignal<ProfileResponse | null> =
    signal<ProfileResponse | null>(null);
  public readonly loading: WritableSignal<boolean> = 
    signal<boolean>(false);
  public readonly saving: WritableSignal<boolean> =
    signal<boolean>(false);
  public readonly success: WritableSignal<boolean> = 
    signal<boolean>(false);
  public readonly error: WritableSignal<string | null> =
    signal<string | null>(null);

  public ngOnInit(): void {
    this._load();
  }

  private _load(): void {
    this.loading.set(true);
    this.PROFILE_SVC.getProfile().subscribe({
      next: data => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  public onSave(payload: UpdateProfileRequest): void {
    this.saving.set(true);
    this.error.set(null);
    this.success.set(false);

    this.PROFILE_SVC.updateProfile(payload).subscribe({
      next: data => {
        this.data.set(data);
        this.saving.set(false);
        this.success.set(true);
        setTimeout(() => this.success.set(false), 3000);
      },
      error: () => {
        this.saving.set(false);
        this.error.set('Failed to save. Please try again.');
      },
    });
  }

  public onAvatarChange(event: Event): void {
    const FILE: File = (event.target as HTMLInputElement).files?.[0]!;
    if (!FILE) return;
    this.PROFILE_SVC.updateAvatar(FILE).subscribe({
      next: data => this.data.set(data),
    });
  }
}
