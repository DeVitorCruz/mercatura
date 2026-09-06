import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@mercatura/shop/feature-auth').then((m) => m.authRoutes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('@mercatura/shop/feature-products').then(
        (m) => m.featureProductsRoutes,
      ),
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import('@mercatura/shop/feature-product-detail').then(
        (m) => m.featureProductDetailRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
