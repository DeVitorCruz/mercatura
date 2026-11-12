import { Component, computed, inject, Signal } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { SLIDES } from '../SLIDES';
import { TextAuthSlide } from '../auth-default.template';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { SliderComponent } from '@mercatura/ui';
import { SliderConfig } from '@mercatura/models';
import { TextSlideComponent } from '../slides/text-slide.component';
import { IconComponent } from '@mercatura/ui';
import { SocialProvider } from '@mercatura/models';
import { SOCIAL_PROVIDERS } from '../SOCIAL_PROVIDERS';

@Component({
  selector: 'lib-layout',
  imports: [RouterOutlet, RouterLink, SliderComponent, IconComponent],
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

  public readonly SOCIAL_PROVIDERS: SocialProvider[] = 
    this.ROUTE.snapshot.data['socialProviders'] ?? SOCIAL_PROVIDERS;

  public readonly SLIDE_CONFIG: SliderConfig = {
    items: this.RAW_SLIDES.map((slide, index) => ({
      id: index,
      component: TextSlideComponent,
      inputs: {
        title: slide.title,
        description: slide.description,
      },
    })),
    containerClass: 'auth-slides-swiper',
    loop: true,
    autoplay: true,
    autoplayDelay: 4000,
    slidesPerView: 1,
    showPagination: true,
    showNavigation: false,
  };
}
