import { TestBed } from '@angular/core/testing';
import { ProfileStateService } from './profile-state.service';

describe('ProfileState', () => {
  let service: ProfileStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
