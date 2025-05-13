import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isDarkTheme: boolean = false;
  isSidenavOpen = false;
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkTheme = localStorage.getItem('theme') === 'dark-theme';
      if (!this.isDarkTheme) {
        localStorage.setItem('theme', 'light-theme');
      }
      const rootElement = document?.documentElement;
      if (this.isDarkTheme) {
        rootElement.classList.remove('light-theme');
        rootElement.classList.add('dark-theme');
      } else {
        rootElement.classList.remove('dark-theme');
        rootElement.classList.add('light-theme');
      }
    }
  }
}
