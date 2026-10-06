import { Component, inject, OnInit, Signal } from '@angular/core';
import { ProfileStateService } from '../../../profile-state/profile-state.service';
import { ProfileResponse } from '@mercatura/models';
import { FormConfig } from '@mercatura/ui'; 
import { FORM_CONFIG } from './FORM_CONFIG';
import { UpdateProfileRequest } from '@mercatura/models';
import { FormUiComponent } from '@mercatura/ui';

@Component({
  selector: 'lib-personal-info',
  imports: [FormUiComponent],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  private readonly STATE: ProfileStateService = 
    inject(ProfileStateService);

  public readonly data: Signal<ProfileResponse | null> = 
    this.STATE.data;
  public readonly saving: Signal<boolean> = 
    this.STATE.saving;
  public readonly error: Signal<string | null> =
    this.STATE.error;

  public readonly FORM_CONFIG: FormConfig = 
    FORM_CONFIG as FormConfig;
  
  public ngOnInit(): void {
    const DATA: ProfileResponse = this.data()!;
    if (!DATA) return;
    // pre-filll form values
    this.FORM_CONFIG.fields[0].value = DATA.user.name;
    this.FORM_CONFIG.fields[1].value = DATA.profile?.bio ?? '';
    this.FORM_CONFIG.fields[2].value = DATA.profile?.phone ?? '';
    this.FORM_CONFIG.fields[3].value = DATA.profile?.website ?? '';
  }

  public onSubmit(values: Record<string, any>): void {
    this.STATE.save({
      name: values['name'] as string,
      bio: values['bio'] as string,
      phone: values['phone'] as string,
      website: values['website'] as string,
    } as UpdateProfileRequest);
  }
}
