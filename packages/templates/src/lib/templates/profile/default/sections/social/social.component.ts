import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormUiComponent } from '@mercatura/ui';
import { FormConfig } from '@mercatura/ui';
import { FORM_CONFIG } from './FORM_CONFIG';
import { ProfileStateService } from '../../../profile-state/profile-state.service';
import { UpdateProfileRequest, UserProfile } from '@mercatura/models';

@Component({
  selector: 'lib-social',
  imports: [FormUiComponent],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss',
})
export class SocialComponent implements OnInit {
  private readonly STATE: ProfileStateService = 
    inject(ProfileStateService);

  public readonly saving: Signal<boolean> =
    this.STATE.saving;
  public readonly error: Signal<string | null> =
    this.STATE.error;

  public readonly FORM_CONFIG: FormConfig = FORM_CONFIG;
  
  public ngOnInit(): void {
    const PROFILE: UserProfile = 
      this.STATE.data()?.profile!;
    if (!PROFILE) return;
    this.FORM_CONFIG.fields[0].value = PROFILE.linkedin ?? '';
    this.FORM_CONFIG.fields[1].value = PROFILE.twitter ?? '';
    this.FORM_CONFIG.fields[2].value = PROFILE.instagram ?? '';
  }

  public onSubmit(values: Record<string, any>): void {
    this.STATE.save(values as UpdateProfileRequest);
  }
}
