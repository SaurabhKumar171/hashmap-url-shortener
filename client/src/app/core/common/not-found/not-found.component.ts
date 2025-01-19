import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  countdown: number = 5;

  constructor() {}

  ngOnInit(): void {
    this.startCountdown(() => {
      window.location.href = '/';
    });
  }

  redirectToCreatePage(): void {
    window.location.href = '/';
  }  

  private startCountdown(callback: () => void): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        callback();
      }
    }, 1000); // Decrease countdown every second
  }
}
