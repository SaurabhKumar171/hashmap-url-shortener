import { Component } from '@angular/core';
import { GenerateShortUrlComponent } from "../generate-short-url/generate-short-url.component";
import { RetrieveLongUrlComponent } from '../retrieve-long-url/retrieve-long-url.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GenerateShortUrlComponent, RetrieveLongUrlComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
