import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RetrieveUrlService } from './services/retrieve-url/retrieve-url.service';
import { RetrieveUrlResponse } from './interfaces/url-retrieve/retrieve-url-response.interface';
import { environment } from '../environments/environment';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const shortUrlGuard: CanActivateFn = (route, state) => {
  const retrieveUrlService = inject(RetrieveUrlService);
  const router = inject(Router);

  const shortId = route.url[0]?.path;

  // Validation: Check if shortId is valid
  if (!shortId || typeof shortId !== 'string' || shortId.trim().length === 0) {
    console.error('Invalid Short ID');
    router.navigate(['/404']);
    return of(false); // Stop navigation
  }

  // Fetch the original URL
  return retrieveUrlService.getOriginalUrl(shortId).pipe(
    map((response: RetrieveUrlResponse) => {
      const originalUrl = response?.data?.originalUrl || '';

      if (originalUrl) {
        if (typeof window !== 'undefined') {
          window.location.href = originalUrl; // Redirect to the original URL
        }
        return false; // Stop further navigation
      } else {
        console.error('Original URL is empty');
        router.navigate(['/404']);
        return false; // Stop navigation
      }
    }),
    catchError((error) => {
      console.error('Error retrieving URL:', error);
      if (typeof window !== 'undefined') {
        window.location.href = `${environment.base_url}/404`; // Redirect to custom 404 page
      }
      return of(false); // Stop navigation
    })
  );
};
