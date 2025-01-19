import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RetrieveUrlService } from '../../../../services/retrieve-url/retrieve-url.service';
import { RetrieveUrlResponse } from '../../../../interfaces/url-retrieve/retrieve-url-response.interface';

@Component({
  selector: 'app-retrieve-long-url',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './retrieve-long-url.component.html',
  styleUrl: './retrieve-long-url.component.css'
})
export class RetrieveLongUrlComponent {
  shortUrl: string = '';
  retrievedLongUrl: string = '';

  constructor(private retrieveUrlService: RetrieveUrlService) {}

  setShortUrl(value: string): void {
    this.shortUrl = value;
  }

  handleRetrieveLongUrl(): void {
    if(this.shortUrl){
      const arr = this.shortUrl.split("/");
      const id = arr[arr.length - 1];

      this.retrieveUrlService.getOriginalUrl(id).subscribe((response : RetrieveUrlResponse) => {
        this.retrievedLongUrl = response?.data?.originalUrl || '';
      },
      (error) => {
        console.error('Error retrieving URL', error);
      });
    }
  }
}
