import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './core/common/not-found/not-found.component';
import { LongUrlRouteCheckComponent } from './core/common/long-url-route-check/long-url-route-check.component';

export const routes: Routes = [
    // Home route
    { path: '', component: HomePageComponent },

    // Not Found route for specific short URL handling
    { path: '404', component: NotFoundComponent },

    // Short URL route with component and handling via LongUrlRouteCheckComponent
    { path: ':shortId', component: LongUrlRouteCheckComponent },

    // Wildcard route to catch all unknown paths and redirect to 404
    { path: '**', redirectTo: '/404' }
];
