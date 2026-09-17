import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, input, InputSignal, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'lib-icon',
  imports: [],
  template: `
    <span class="bi-icon" 
        [style.width.px]="size()"
        [style.height.px]="size()"
        [innerHTML]="svg()">
    </span>
  `,
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  public readonly name: InputSignal<string> =
    input.required<string>();
  
  public readonly size: InputSignal<number> =
    input<number>(16);

  private readonly HTTP: HttpClient = inject(HttpClient);
  private readonly SANITIZER: DomSanitizer =
    inject(DomSanitizer);
  private readonly isBrowser: boolean =
    isPlatformBrowser(inject(PLATFORM_ID));

  public readonly svg: WritableSignal<SafeHtml> = 
    signal<SafeHtml>('');

  constructor() {
    effect(() => {
      const ICON_NAME: string = this.name();
      if (!this.isBrowser || !ICON_NAME) return;

      this.HTTP.get(
        `/assets/icons/${ICON_NAME}.svg`,
        { responseType: 'text' }
      ).pipe(
        catchError(() => of(''))
      ).subscribe(svg => {
        this.svg.set(
          this.SANITIZER.bypassSecurityTrustHtml(svg)
        )
      });
    });
  }
}
