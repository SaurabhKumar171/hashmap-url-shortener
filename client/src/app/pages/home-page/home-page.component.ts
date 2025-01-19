import { Component } from '@angular/core';
import { GenerateShortUrlComponent } from '../../core/components/HomePage/generate-short-url/generate-short-url.component';
import { RetrieveLongUrlComponent } from '../../core/components/HomePage/retrieve-long-url/retrieve-long-url.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [GenerateShortUrlComponent, RetrieveLongUrlComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
