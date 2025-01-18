import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { API_URLS } from '../../constants/api-urls';
import { RetrieveUrlResponse } from '../../interfaces/url-retrieve/retrieve-url-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RetrieveUrlService {

  constructor(private readonly apiService: ApiService) {}

    /**
     * Retrieves the original URL associated with the given short URL ID.
     *
     * @param shortId - The unique identifier of the shortened URL.
     * @returns An observable of the original URL as a string.
     */
    getOriginalUrl(shortId: string): Observable<RetrieveUrlResponse> {
      const endpoint = `${API_URLS.URL_ORIGINAL}/${shortId}`;
      return this.apiService.get<RetrieveUrlResponse>(endpoint);
    }
}
