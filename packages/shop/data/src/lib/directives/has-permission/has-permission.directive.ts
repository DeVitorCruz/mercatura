import { Directive, effect, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../../permission/permission.service';

@Directive({
  selector: '[hasPermission]',
})
export class HasPermissionDirective implements OnInit {
  @Input('hasPermission') permission!: string | string[];

  private readonly tpl = inject(TemplateRef<unknown>);
  private readonly vcr = inject(ViewContainerRef);
  private readonly ps = inject(PermissionService);

  constructor() {
    effect(() => {
      const PERMS = Array.isArray(this.permission) ? this.permission : [this.permission];
      this.vcr.clear();
      if (this.ps.canAny(...PERMS)) this.vcr.createEmbeddedView(this.tpl);
    });
  }

  ngOnInit(): void {
    const PERMS = Array.isArray(this.permission) ? this.permission : [this.permission];
      if (this.ps.canAny(...PERMS)) this.vcr.createEmbeddedView(this.tpl);
  }
}
