import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UrlShorteningService } from '../../../../services/url-shortening/url-shortening.service';
import { ShortenUrlResponse } from '../../../../interfaces/url-shortening/shorten-url-response.interface';

@Component({
  selector: 'app-generate-short-url',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './generate-short-url.component.html',
  styleUrl: './generate-short-url.component.css'
})
export class GenerateShortUrlComponent {
  longUrl: string = '';
  generatedShortUrl: string = '';

  constructor(private urlShorteningService: UrlShorteningService) {}

  setLongUrl(value: string): void {
    this.longUrl = value;
  }

  handleGenerateShortUrl(): void {
    if(this.longUrl){
      this.urlShorteningService.shortenUrl(this.longUrl).subscribe((response : ShortenUrlResponse) => {
        this.generatedShortUrl = response?.data?.shortenedUrl;
      },
      (error) => {
        console.error('Error shortening URL', error);
      });
    }
  }
}
