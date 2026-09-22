import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@mercatura/ui';
import { filter, map, startWith } from 'rxjs';
import { BreadcrumbItem } from '@mercatura/ui';
import { PageInfo } from './page-info.interface';

@Component({
  selector: 'lib-page-banner',
  imports: [RouterOutlet, BreadcrumbComponent],
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.scss',
})
export class PageBannerComponent {
  private readonly ROUTER: Router = inject(Router);
  private readonly ROUTE: ActivatedRoute =
    inject(ActivatedRoute);
  
  public readonly pageInfo: Signal<PageInfo | undefined> = 
    toSignal<PageInfo | undefined>(
      this.ROUTER.events.pipe(
        filter(e => e instanceof Navigation),
        startWith(null),
        map(() => (this._buildPageInfo() as PageInfo))
      )
    );
  
  private _buildPageInfo(): PageInfo {
    let route = this.ROUTE;
    while(route.firstChild) route = route.firstChild;
    
    const TITLE: string = route.snapshot.data['title'] ?? 
      this._titleFromUrl(this.ROUTER.url);

    const BREADCRUMBS: BreadcrumbItem[] = [
      { label: 'home', route: '/' },
      { label: TITLE }
    ]; 

    return { title: TITLE, breadcrumbs: BREADCRUMBS, } as PageInfo;
  }

  private _titleFromUrl(url: string): string {
    const SEGMENT: string = url.split('/').filter(Boolean).pop() ?? 'Dashboard';
    return SEGMENT.charAt(0).toUpperCase() + SEGMENT.slice(1);
  }
} 
