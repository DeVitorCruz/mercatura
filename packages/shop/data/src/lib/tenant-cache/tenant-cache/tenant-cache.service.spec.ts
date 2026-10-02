import { TestBed } from '@angular/core/testing';
import { TenantCacheService } from './tenant-cache.service';

describe('TenantCache', () => {
  let service: TenantCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
