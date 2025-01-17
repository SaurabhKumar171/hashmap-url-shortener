import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  setShortUrl(value: string): void {
    this.shortUrl = value;
  }

  handleRetrieveLongUrl(): void {
    alert(this.shortUrl);
  }
}
