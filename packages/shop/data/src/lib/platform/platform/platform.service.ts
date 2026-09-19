import { Service } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Observable } from 'rxjs';
import { 
    Tenant,
    CreateTenantRequest,
    CreateAppRequest,
    UpdateTenantRequest,
    UpdateThemeRequest,
    CreateTenantResponse,
    CreateAppResponse,
    Dashboard,
    AppDashboard,
    AppTheme,
    AppDomain,
    TenantApp,
    Plan,
} from '@mercatura/models';

@Service()
export class PlatformService extends ApiService {

    // --- Tenant ---------------------------------------
    public getTenant(): Observable<Tenant> {
        return this.get<Tenant>('platform/tenant');
    }

    public createTenant(data: CreateTenantRequest): Observable<CreateTenantResponse> {
        return this.post<CreateTenantResponse>('platform/tenant', data);
    }

    public updateTenant(data: UpdateTenantRequest): Observable<Tenant> {
        return this.patch<Tenant>('platform/tenant', data);
    }

    // --- Dashboard ---------------------------------------
    public getDashboard(): Observable<Dashboard> {
        return this.get<Dashboard>('platform/dashboard');
    }

    public getAppDashboard(id: number): Observable<AppDashboard> {
        return this.get<AppDashboard>(`platform/dashboard/app/${id}`);
    }

    // --- Apps ---------------------------------------
    public getApps(): Observable<TenantApp[]> {
        return this.get<TenantApp[]>('platform/apps');
    }

    public createApp(data: CreateAppRequest): Observable<CreateAppResponse> {
        return this.post<CreateAppResponse>('platform/apps', data);
    }

    public updateAppTheme(id: number, data: UpdateThemeRequest): Observable<TenantApp> {
        return this.patch<TenantApp>(`platform/apps/${id}/theme`, data);
    }

    // --- Themes ---------------------------------------
    public getThemes(appType?: string): Observable<AppTheme[]> {
        const PARAMS: Record<string, string> = (appType? { app_type: appType } : undefined)!;
        return this.get<AppTheme[]>('platform/themes', PARAMS);
    }

    // --- Plans ---------------------------------------
    public getPlans(): Observable<Plan[]> {
        return this.get<Plan[]>('platform/plans');    
    }

    // --- Domains ---------------------------------------
    public addDomain(appId: number, domain: string): Observable<AppDomain> {
        return this.post<AppDomain>(`platform/apps/${appId}/domains`, { domain });    
    }

    public verifyDomain(appId: number, domainId: number): Observable<AppDomain> {
        return this.patch<AppDomain>(
            `platform/apps/${appId}/domains/${domainId}/verify`, {}
        );    
    }

    public deleteDomain(appId: number, domainId: number): Observable<{ message: string }> {
        return this.delete<{ message: string }>(
            `platform/apps/${appId}/domains/${domainId}`
        );    
    }
}
