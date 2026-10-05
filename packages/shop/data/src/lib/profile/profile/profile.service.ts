import { Service } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ProfileResponse } from '@mercatura/models';
import { UpdateProfileRequest } from '@mercatura/models';
import { Observable } from 'rxjs';

@Service()
export class ProfileService extends ApiService {
    public getProfile(): Observable<ProfileResponse> {
        return this.get<ProfileResponse>('profile');
    }

    public updateProfile(data: UpdateProfileRequest): Observable<ProfileResponse> {
        return this.patch<ProfileResponse>('profile', data);
    }

    public updateAvatar(file: File): Observable<ProfileResponse> {
        const FORM: FormData = new FormData();
        FORM.append('avatar', file);
        return this.http.post<ProfileResponse>(
            `${this.BASE_URL}/profile`, 
            FORM
        );
    }
}
