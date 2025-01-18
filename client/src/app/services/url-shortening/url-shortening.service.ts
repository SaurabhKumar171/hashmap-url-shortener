import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { API_URLS } from '../../constants/api-urls';
import { ShortenUrlResponse } from '../../interfaces/url-shortening/shorten-url-response.interface';

/**
 * Service for handling URL shortening operations.
 * Provides methods to shorten URLs, retrieve original URLs, and handle redirection.
 */
@Injectable({
  providedIn: 'root',
})
export class UrlShorteningService {
  constructor(private readonly apiService: ApiService) {}

  /**
   * Generates a shortened URL for the given original URL.
   *
   * @param longUrl - The original URL to be shortened.
   * @returns An observable of the response containing the shortened URL details.
   */
  shortenUrl(longUrl: string): Observable<ShortenUrlResponse> {
    const payload = { originalUrl: longUrl };
    return this.apiService.post<ShortenUrlResponse>(API_URLS.URL_SHORTENING, payload);
  }

  /**
   * Redirects to the original URL using the given short URL ID.
   *
   * @param shortId - The unique identifier of the shortened URL.
   * @returns An observable of the original URL as a string.
   */
  redirectToUrl(shortId: string): Observable<string> {
    const endpoint = `${API_URLS.URL_REDIRECT}/${shortId}`;
    return this.apiService.get<string>(endpoint);
  }
}
