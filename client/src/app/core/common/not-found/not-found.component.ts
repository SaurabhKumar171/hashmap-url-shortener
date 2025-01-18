import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{
  countdown: number = 5;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.redirectToCreatePage();
      }
    }, 1000);
  }

  redirectToCreatePage(): void {
    this.router.navigate(['/create']);
  }
}
