import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiRoutesService } from './shared/api-routes.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private projectService: ApiRoutesService
  ) {}

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
      this.addVisitor();
    }
  }

  addVisitor() {
    // Only track visitor once per session
    if (sessionStorage.getItem('visitor_tracked')) {
      return;
    }
    
    this.projectService.addVisitor().subscribe({
      next: (res) => {
        sessionStorage.setItem('visitor_tracked', 'true');
        console.log('Visitor tracked:', res);
      },
      error: (err) => {
        console.error('Error tracking visitor:', err);
      },
    });
  }
}
