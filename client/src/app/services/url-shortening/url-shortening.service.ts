import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { API_URLS } from '../../constants/api-urls';

@Injectable({
  providedIn: 'root'
})
export class UrlShorteningService {

  constructor(private apiService: ApiService) { }

  shortenUrl(longUrl: string): Observable<string> {
    return this.apiService.post(API_URLS.URL_SHORTENING, { longUrl });
  }

  getOriginalUrl(shortId: string): Observable<string> {
    return this.apiService.get(`${API_URLS.URL_ORIGINAL}/${shortId}`);
  }

  redirectToUrl(shortId: string): Observable<string> {
    return this.apiService.get(`${API_URLS.URL_REDIRECT}/${shortId}`);
  }
}
