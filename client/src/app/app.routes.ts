import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/common/not-found/not-found.component';
import { shortUrlGuard } from './short-url.guard';
import { LoaderComponent } from './core/common/loader/loader.component';

export const routes: Routes = [
    // Home route
    { path: '', component: HomeComponent },

    // Short URL route with custom guard
    { 
        path: ':shortId', 
        canActivate: [shortUrlGuard],
       component: LoaderComponent
    },

    // Not Found route for specific short URL handling
    { path: '404', component: NotFoundComponent },

    // Wildcard route to redirect any unknown paths to the home page
    { path: '**', redirectTo: '/' }
];
