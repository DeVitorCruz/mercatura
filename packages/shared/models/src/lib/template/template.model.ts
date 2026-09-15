import { Route } from '@angular/router';
import { Provider } from '@angular/core';

export interface TemplateInterface {
    name: string;
    routes: Route[]; // lazy routes
    providers?: Provider[]; // optional DI
    styles?: string; // CSS token overrides
};