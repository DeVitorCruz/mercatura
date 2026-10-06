import { Component, inject, OnInit, Signal } from '@angular/core';
import { FORM_CONFIG } from './FORM_CONFIG';
import { FormConfig } from '@mercatura/ui';
import { ProfileStateService } from '../../../profile-state/profile-state.service';
import { UserProfile } from '@mercatura/models';
import { UpdateProfileRequest } from '@mercatura/models';
import { FormUiComponent } from '@mercatura/ui';

@Component({
  selector: 'lib-address',
  imports: [FormUiComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent implements OnInit {
  private readonly STATE: ProfileStateService =
    inject(ProfileStateService);

  public readonly saving: Signal<boolean> = 
    this.STATE.saving;
  public readonly error: Signal<string | null> =
    this.STATE.error;

  public readonly FORM_CONFIG: FormConfig = 
    FORM_CONFIG as FormConfig;
  
  public ngOnInit(): void {
    const PROFILE: UserProfile = 
      this.STATE.data()?.profile!;
    if (!PROFILE) return;
    this.FORM_CONFIG.fields[0].value = PROFILE.address_line1 ?? '';
    this.FORM_CONFIG.fields[1].value = PROFILE.address_line2 ?? '';
    this.FORM_CONFIG.fields[2].value = PROFILE.city ?? '';
    this.FORM_CONFIG.fields[3].value = PROFILE.state ?? '';
    this.FORM_CONFIG.fields[4].value = PROFILE.postal_code ?? '';
    this.FORM_CONFIG.fields[5].value = PROFILE.country ?? 'BR';
  }

  public onSubmit(values: Record<string, any>): void {
    this.STATE.save(values as UpdateProfileRequest);
  }
}
