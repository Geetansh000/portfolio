import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
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
    trigger('rotateHamburger', [
      state('closed', style({ transform: 'rotate(0deg)' })),
      state('open', style({ transform: 'rotate(90deg)' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  isMobile = false;
  isSidenavOpen = false;
  isDarkTheme = false;

  @HostBinding('class') className = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private overlay: OverlayContainer,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') || 'dark-theme';
      this.isDarkTheme = savedTheme === 'dark-theme';
      this.applyThemeClasses();
    }
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  toggleSidenav(drawer: MatSidenav) {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.isSidenavOpen ? drawer.open() : drawer.close();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyThemeClasses();

    localStorage.setItem(
      'theme',
      this.isDarkTheme ? 'dark-theme' : 'light-theme',
    );
  }

  private applyThemeClasses(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;
    const overlayContainer = this.overlay.getContainerElement();

    root.classList.toggle('dark-theme', this.isDarkTheme);
    root.classList.toggle('light-theme', !this.isDarkTheme);

    overlayContainer.classList.toggle('dark-theme', this.isDarkTheme);
    overlayContainer.classList.toggle('light-theme', !this.isDarkTheme);
  }
}
