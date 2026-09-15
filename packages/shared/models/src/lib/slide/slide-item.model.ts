import { Type } from '@angular/core';

export interface SliderItem {
    id: number;
    component: Type<any>;
    inputs?: Record<string, any>;
};

export interface SliderConfig {
    items: SliderItem[];
    containerClass: string;
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    showPagination?: boolean;
    showNavigation?: boolean;
    modules?: any[];
    breakpoints?: Record<number, Partial<SliderConfig>>;
};