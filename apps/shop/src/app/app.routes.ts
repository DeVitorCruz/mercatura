import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('@mercatura/shop/feature-products').then((m) => m.featureProductsRoutes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('@mercatura/shop/feature-product-detail').then(
        (m) => m.featureProductDetailRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
