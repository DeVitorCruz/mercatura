import { isPlatformBrowser, NgComponentOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, input, InputSignal, OnDestroy, PLATFORM_ID } from '@angular/core';
import { SliderConfig } from '@mercatura/models';
import { Swiper } from 'swiper';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import { SwiperOptions, SwiperModule } from 'swiper/types';

@Component({
  selector: 'lib-slider',
  imports: [NgComponentOutlet],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  public readonly config: InputSignal<SliderConfig> = input.required<SliderConfig>();

  private readonly EL: ElementRef = inject(ElementRef);
  private readonly IS_BROWSER: boolean = isPlatformBrowser(inject(PLATFORM_ID));
  private swiper!: Swiper;

  public ngAfterViewInit(): void {
    if (!this.IS_BROWSER) return;
    requestAnimationFrame(() => this._initSwiper());
  }

  public ngOnDestroy(): void {
    if (this.swiper) this.swiper.destroy(true, true);
  }

  private _initSwiper(): void {
    const CONFIG: SliderConfig = this.config();
    const EL: any = this.EL.nativeElement.querySelector(`.${CONFIG.containerClass}`);
    if (!EL) return;

    const MODULES: SwiperModule[] = [
      Navigation, Pagination, Autoplay,
      Thumbs, FreeMode, ...(CONFIG.modules ?? []),
    ];

    const OPTIONS: SwiperOptions = {
      modules: MODULES,
      loop: CONFIG.loop ?? false,
      slidesPerView: CONFIG.slidesPerView ?? 1,
      spaceBetween: CONFIG.spaceBetween ?? 0,
      breakpoints: CONFIG.breakpoints as any,
    } as SwiperOptions;

    if (CONFIG.showPagination) {
      OPTIONS.pagination = { el: '.swiper-pagination', clickable: true, };
    }

    if (CONFIG.showNavigation) {
      OPTIONS.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };
    }

    if (CONFIG.autoplay) {
      OPTIONS.autoplay = {
        delay: CONFIG.autoplayDelay ?? 4000,
        disableOnInteraction: false,
      };
    }
    
    this.swiper = new Swiper(EL, OPTIONS);
  }
}
