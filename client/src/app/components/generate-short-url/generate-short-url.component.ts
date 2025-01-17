import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UrlShorteningService } from '../../services/url-shortening/url-shortening.service';

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
      this.urlShorteningService.getOriginalUrl(this.longUrl).subscribe((response) => {
        this.generatedShortUrl = response;
      },
      (error) => {
        console.error('Error shortening URL', error);
      });
    }
  }
}
