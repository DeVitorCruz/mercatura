import { Component, computed, inject, Signal, Type } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { SLIDES } from '../SLIDES';
import { TextAuthSlide } from '../auth-default.template';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { SliderComponent } from '@mercatura/ui';
import { SliderConfig, SliderItem } from '@mercatura/models';
import { TextSlideComponent } from '../slides/text-slide.component';

@Component({
  selector: 'lib-layout',
  imports: [RouterOutlet, RouterLink, SliderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private readonly ROUTER: Router = inject(Router);
  private readonly ROUTE: ActivatedRoute = inject(ActivatedRoute);
  private readonly URL: Signal<any> = toSignal(
    this.ROUTER.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.ROUTER.url),
      startWith(this.ROUTER.url)
    )
  );

  public readonly isLogin: Signal<boolean> = computed(() =>
    !this.URL()?.includes('register')
  );

  public readonly RAW_SLIDES: TextAuthSlide[] = 
    this.ROUTE.snapshot.data['slides'] ?? SLIDES;

  public readonly IMG_PATH: string =  
    this.ROUTE.snapshot.data['imgPath'] ?? 'assets/auth-logo-grafic.png';

  public readonly SLIDE_CONFIG: SliderConfig = {
    items: this.RAW_SLIDES.map((slide, index) => ({
      id: index as number,
      component: TextSlideComponent as Type<any>,
      inputs: {
        title: slide.title,
        description: slide.description,
      } as Record<string, any>,
    })) as SliderItem[],
    containerClass: 'auth-slides-swiper' as string,
    loop: true as boolean,
    autoplay: true as boolean,
    autoplayDelay: 4000 as number,
    slidesPerView: 1 as number,
    showPagination: true as boolean,
    showNavigation: false as boolean,
  } as SliderConfig;
}
