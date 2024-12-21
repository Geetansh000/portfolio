import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
  ],
  animations: [
    // Animation for sliding navbar links in/out
    trigger('slideInOut', [
      state(
        'void',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      transition(':enter, :leave', [animate('300ms ease-in-out')]),
    ]),
    // Rotate hamburger icon animation
    trigger('rotateHamburger', [
      state('closed', style({ transform: 'rotate(0deg)' })),
      state('open', style({ transform: 'rotate(90deg)' })),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class NavbarComponent {
  constructor(private overlay: OverlayContainer) {}
  isSidenavOpen = false;
  isDarkTheme = false; // Default theme
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
  ngOnInit() {
    const rootElement = document?.documentElement;
    console.log("🚀 ~ NavbarComponent ~ ngOnInit ~ rootElement:", rootElement)
    if (this.isDarkTheme) {
      rootElement.classList.remove('light-theme');
      rootElement.classList.add('dark-theme');
    } else {
      rootElement.classList.remove('dark-theme');
      rootElement.classList.add('light-theme');
    }
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    // Toggle the theme class on the body or root element
    const rootElement = document.documentElement;
    if (this.isDarkTheme) {
      rootElement.classList.remove('light-theme');
      rootElement.classList.add('dark-theme');
    } else {
      rootElement.classList.remove('dark-theme');
      rootElement.classList.add('light-theme');
    }
  }
}
