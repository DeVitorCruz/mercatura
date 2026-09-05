import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class ApiService {
    protected readonly http: HttpClient = inject(HttpClient);
    protected readonly BASE_URL: string = 'https://ecommerce-blog.devitor.local/api';

    protected get<T>(endpoint: string, params?: Record<string, string | number>): Observable<T> {
        let httpParams: HttpParams = new HttpParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    httpParams = httpParams.set(key, String(value));
                }
            });
        }
        return this.http.get<T>(`${this.BASE_URL}/${endpoint}`, { params: httpParams });
    }

    protected post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.BASE_URL}/${endpoint}`, body);
    }

    protected patch<T>(endpoint: string, body: any): Observable<T> {
        return this.http.patch<T>(`${this.BASE_URL}/${endpoint}`, body);
    }

    protected delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.BASE_URL}/${endpoint}`);
    }
}
