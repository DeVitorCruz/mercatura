import { computed, Service, signal } from '@angular/core';

@Service()
export class PermissionService {
    private readonly _permissions = signal<string[]>([]);
    private readonly _roles = signal<string[]>([]);

    readonly permissions = computed(() => this._permissions());
    readonly roles = computed(() => this._roles());

    set(permissions: string[], roles: string[]): void {
        this._permissions.set(permissions);
        this._roles.set(roles);
    }

    clear(): void {
        this._permissions.set([]);
        this._roles.set([]);
    }

    /** User must have All listed permissions */
    can(...perms: string[]): boolean {
        return perms.every(p => this._permissions().includes(p));
    }

    /** User must have AT LEAST ONE of the listed permissions */
    canAny(...perms: string[]): boolean {
        return perms.some(p => this._permissions().includes(p));
    }

    hasRole(role: string): boolean {
        return this._roles().includes(role);
    }
}
