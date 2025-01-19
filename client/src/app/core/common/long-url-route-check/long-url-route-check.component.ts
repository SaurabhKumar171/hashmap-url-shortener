import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RetrieveUrlService } from '../../../services/retrieve-url/retrieve-url.service';
import { RetrieveUrlResponse } from '../../../interfaces/url-retrieve/retrieve-url-response.interface';
import { GenerateShortUrlComponent } from "../../components/generate-short-url/generate-short-url.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-long-url-route-check',
  standalone: true,
  imports: [GenerateShortUrlComponent, LoaderComponent],
  templateUrl: './long-url-route-check.component.html',
  styleUrls: ['./long-url-route-check.component.css'] 
})
export class LongUrlRouteCheckComponent implements OnInit {

  isLoading = true;
  loadingMessage = 'Trying to fetch the URL...'; // Message for the loading state
  originalUrl: string | null = null;
  countdown: number = 5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private retrieveUrlService: RetrieveUrlService
  ) {}

  ngOnInit(): void {
    const shortId = this.route.snapshot.params['shortId'];
  
    this.retrieveUrlService.getOriginalUrl(shortId).subscribe(
      (response: RetrieveUrlResponse) => {
        const originalLink = response?.data?.originalUrl || '';
        if (originalLink) {
          this.isLoading = false;
          this.loadingMessage = `URL found! Redirecting in ${this.countdown} seconds...`;
          this.originalUrl = originalLink;

          // Start countdown and redirect
          this.startCountdown(() => {
            window.location.href = originalLink;
          });
        } else {
          this.handleError('Original URL not found. Redirecting to 404 page...');
        }
      },
      error => {
        console.error('Error retrieving the URL:', error);
        this.handleError('An error occurred while fetching the URL. Redirecting to 404 page...');
      }
    );
  }

  private startCountdown(callback: () => void): void {
    const interval = setInterval(() => {
      this.countdown--;
      this.loadingMessage = `Redirecting in ${this.countdown} seconds...`;

      if (this.countdown === 0) {
        clearInterval(interval);
        callback();
      }
    }, 1000); // Decrease countdown every second
  }

  private handleError(errorMessage: string): void {
    this.isLoading = false;
    this.loadingMessage = errorMessage;

    // Redirect to 404 after 5 seconds
    setTimeout(() => {
      this.router.navigateByUrl('/404');
    }, 5000);
  }
}
